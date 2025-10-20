import { NextResponse } from "next/server";
import { z } from "zod";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { signAuthToken, AUTH_COOKIE } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(4, "Mot de passe trop court"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parse = LoginSchema.safeParse(json);
    if (!parse.success) {
      return NextResponse.json(
        { error: parse.error.flatten().formErrors.join(" • ") || "Champs invalides" },
        { status: 400 }
      );
    }
    const { email, password } = parse.data;

    // Connexion BDD (reprend ta conf MAMP du dump)
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 8889,
      user: "root",
      password: "root",
      database: "gestion_tmp_travail",
    });

    // Récup user
    const [rows] = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste, mdp FROM user WHERE mail = ? LIMIT 1",
      [email]
    );
    await connection.end();

    const list = rows as any[];
    if (!list || list.length === 0) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 });
    }
    const user = list[0] as {
      id_user: number;
      nom: string;
      prenom: string;
      mail: string;
      poste: string;
      mdp: string; // hash ou clair selon ta base actuelle
    };

    // Mot de passe : si hash bcrypt -> compare, sinon compare clair à clair
    let valid = false;
    if (user.mdp && user.mdp.startsWith("$2")) {
      valid = await bcrypt.compare(password, user.mdp);
    } else {
      valid = user.mdp === password;
    }
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Rôle : admin si poste = admin ou rh ; sinon user
    const poste = (user.poste || "").toLowerCase();
    const role: "admin" | "user" =
      poste === "admin" || poste === "rh" ? "admin" : "user";

    // JWT
    const token = await signAuthToken({
      sub: String(user.id_user),
      email: user.mail,
      firstName: user.prenom,
      lastName: user.nom,
      role,
    });

    const res = NextResponse.json(
      {
        user: {
          id_user: user.id_user,
          nom: user.nom,
          prenom: user.prenom,
          mail: user.mail,
          poste: user.poste,
          role,
        },
      },
      { status: 200 }
    );

    // Cookie HttpOnly
    res.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return res;
  } catch (err) {
    console.error("Erreur API login :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
