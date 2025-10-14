import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { verify } from "jsonwebtoken";

// Créer une nouvelle demande
export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const formData = await req.formData();
    const type = formData.get("type") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const justificatif = formData.get("justificatif") as File | null;

    let filePath: string | null = null;
    if (justificatif) {
      const bytes = await justificatif.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${justificatif.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const uploadPath = path.join(uploadDir, fileName);
      fs.writeFileSync(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [result] = await connection.execute(
      "INSERT INTO demande (id_user, type, date_demande, date_debut, date_fin, statut_demande, justificatif) VALUES (?, ?, NOW(), ?, ?, ?, ?)",
      [userId, type, startDate, endDate, "en attente", filePath]
    );

    await connection.end();
    return NextResponse.json({ success: true, demandeId: (result as any).insertId });
  } catch (err) {
    console.error("Erreur API demande:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}

// Mettre à jour le justificatif d'une demande
export async function PATCH(req: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const formData = await req.formData();
    const idDemande = formData.get("id_demande") as string;
    const justificatif = formData.get("justificatif") as File | null;

    if (!idDemande || !justificatif)
      return NextResponse.json({ success: false, error: "Données manquantes" }, { status: 400 });

    // Upload du fichier
    const bytes = await justificatif.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${justificatif.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const uploadPath = path.join(uploadDir, fileName);
    fs.writeFileSync(uploadPath, buffer);
    const filePath = `/uploads/${fileName}`;

    // Connexion DB et mise à jour
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    await connection.execute(
      "UPDATE demande SET justificatif = ? WHERE id_demande = ? AND id_user = ?",
      [filePath, idDemande, userId]
    );

    await connection.end();
    return NextResponse.json({ success: true, justificatif: filePath });
  } catch (err) {
    console.error("Erreur PATCH justificatif:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
