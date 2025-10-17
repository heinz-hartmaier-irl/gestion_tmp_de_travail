// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });
    }

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;
    const userRole = decoded.poste;

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    let demandes;
    if (userRole === "admin" || userRole === "RH") {
      [demandes] = await connection.execute(`
        SELECT d.id_demande, d.type, d.date_demande, d.date_debut, d.date_fin, d.statut_demande,
               d.justificatif, u.id_user, u.nom, u.prenom, u.photo
        FROM demande d
        JOIN user u ON d.id_user = u.id_user
        ORDER BY d.date_demande DESC
      `);
    } else {
      // User ne voit que ses demandes
      [demandes] = await connection.execute(`
        SELECT d.id_demande, d.type, d.date_demande, d.date_debut, d.date_fin, d.statut_demande,
               d.justificatif, u.id_user, u.nom, u.prenom, u.photo
        FROM demande d
        JOIN user u ON d.id_user = u.id_user
        WHERE d.id_user = ?
        ORDER BY d.date_demande DESC
      `, [userId]);
    }

    await connection.end();
    return NextResponse.json({ success: true, demandes });
  } catch (err) {
    console.error("Erreur API dashboard:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
