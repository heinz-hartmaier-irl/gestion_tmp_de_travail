import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Vérification basique
    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Connexion à ta BDD MySQL locale
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 8889, // d’après ton SQL dump
      user: "root", // à adapter selon ton environnement
      password: "root", // idem
      database: "gestion_tmp_travail",
    });

    // Vérification de l'utilisateur
    const [rows]: any = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste, mdp FROM user WHERE mail = ? LIMIT 1",
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 });
    }

    const user = rows[0];

    // ⚠️ Pour l’instant tu compares le mot de passe en clair
    // Mais il vaut mieux utiliser bcrypt si possible
    if (user.mdp !== password) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Si OK → tu retournes l’utilisateur (sans le mot de passe)
    const { mdp, ...userData } = user;

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (err: any) {
    console.error("Erreur API login :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
