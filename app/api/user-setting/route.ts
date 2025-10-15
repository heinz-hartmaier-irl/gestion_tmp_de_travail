import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    const [users]: any = await connection.execute(`
      SELECT
        u.id_user,
        u.nom,
        u.prenom,
        u.mail,
        u.poste,
        u.solde_conge,
        u.solde_hsup,
        u.photo,
        d.date_demande AS derniere_demande,
        d.statut_demande AS statut_derniere_demande
      FROM user u
      LEFT JOIN (
        SELECT d1.id_user, d1.date_demande, d1.statut_demande
        FROM demande d1
        WHERE d1.date_demande = (
          SELECT MAX(d2.date_demande)
          FROM demande d2
          WHERE d2.id_user = d1.id_user
        )
      ) d ON u.id_user = d.id_user
      ORDER BY u.nom ASC
    `);

    await connection.end();

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Erreur API /user-setting :", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
