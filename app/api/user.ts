import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // Récupérer le cookie "token"
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(^|;)\s*token=([^;]+)/);
    const token = match ? match[2] : null;

    if (!token) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const decoded: any = verify(token, process.env.JWT_SECRET!);

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [rows]: any = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste FROM user WHERE id_user = ? LIMIT 1",
      [decoded.id]
    );

    await connection.end();

    if (rows.length === 0) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

    return NextResponse.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }
}
