import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 8889,
      user: "root",
      password: "root",
      database: "gestion_tmp_travail",
    });

    // Récupérer le justificatif du malade
    const [rows]: any = await connection.execute(
      `SELECT justificatif FROM maladie_spec WHERE id_demande = ?`,
      [id]
    );

    await connection.end();

    if (rows.length === 0 || !rows[0].justificatif) {
      return NextResponse.json({ error: "Justificatif non trouvé" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), rows[0].justificatif);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
