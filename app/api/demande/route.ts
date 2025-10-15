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
    if (!token) {
      return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });
    }

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const formData = await req.formData();
    const type = formData.get("type") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const justificatif = formData.get("justificatif");

    let filePath: string | null = null;

    if (justificatif instanceof File) {
      // Cas maladie, on veut un fichier
      const bytes = await justificatif.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${justificatif.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const uploadPath = path.join(uploadDir, fileName);
      fs.writeFileSync(uploadPath, buffer);
      filePath = `/uploads/${fileName}`;
    } else if (typeof justificatif === "string") {
      // Cas heures sup, on veut un texte
      filePath = justificatif;
    } else if (type === "conge") {
      // Cas congé, pas de justificatif nécessaire
      filePath = "Justificatif non nécessaire";
    }

    // Connexion à la BDD
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    await connection.execute(
      "INSERT INTO demande (id_user, type, date_demande, date_debut, date_fin, statut_demande, justificatif) VALUES (?, ?, NOW(), ?, ?, ?, ?)",
      [userId, type, startDate, endDate, "en attente", filePath]
    );

    await connection.end();
    return NextResponse.json({ success: true, justificatif: filePath });
  } catch (err) {
    console.error("Erreur API demande:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
