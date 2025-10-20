import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// ⚙️ Connexion à MySQL via MAMP
const db = mysql.createPool({
  host: "localhost",
  port: 8889, // Port MAMP
  user: "root",
  password: "root", // mot de passe MAMP par défaut
  database: "gestion_tmp_travail",
});

export async function POST(req: Request) {
  try {
    const { id_demande, decision } = await req.json();

    if (!id_demande || !decision)
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });

    // ✅ Sécurisation du champ ENUM
    if (!["Acceptée", "Refusée"].includes(decision))
      return NextResponse.json({ error: "Valeur de statut invalide" }, { status: 400 });

    // 📝 Requête SQL
    const [result] = await db.query(
      "UPDATE demande SET statut_demande = ? WHERE id_demande = ?",
      [decision, id_demande]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
