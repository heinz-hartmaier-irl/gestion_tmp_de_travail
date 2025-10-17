import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/authentification/autSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();


    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { email, password } = parsed.data;


    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [rows]: any = await connection.execute("SELECT * FROM user WHERE mail = ?", [email]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Utilisateur introuvable" }, { status: 404 });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.mdp);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Mot de passe incorrect" }, { status: 401 });
    }

    // 🔹 JWT
    const token = jwt.sign(
      { id: user.id_user, email: user.email, poste: user.poste },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
    const response = NextResponse.json({
      success: true,
      message: "Connexion réussie",
      user: {
        id: user.id_user,
        nom: user.nom,
        prenom: user.prenom,
        email: user.mail,
        poste: user.poste,
        photo: user.photo,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Erreur API login:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
