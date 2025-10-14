import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [rows]: any = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste, mdp, date_entree, solde_conge, solde_hsup, statut FROM user WHERE mail = ? LIMIT 1",
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 });
    }

    const user = rows[0];

    if (user.mdp !== password) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // 🔐 Création du JWT
    const token = sign(
      { id: user.id_user, mail: user.mail, poste: user.poste },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const { mdp, ...userData } = user;

    // 🍪 Définition du cookie
    const response = NextResponse.json({ user: userData }, { status: 200 });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    console.error("Erreur API login :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
