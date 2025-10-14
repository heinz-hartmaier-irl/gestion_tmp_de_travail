import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    // Récupérer les cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Vérifier le token
    const decoded: any = verify(token, process.env.JWT_SECRET!);

    // Connexion à la BDD
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [rows]: any = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste, date_entree, solde_conge, solde_hsup, statut FROM user WHERE id_user = ? LIMIT 1",
      [decoded.id]
    );

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Retourner les infos de l’utilisateur
    return NextResponse.json({ user: rows[0] });
  } catch (err: any) {
    console.error("Erreur API profil :", err);
    return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
  }
}
