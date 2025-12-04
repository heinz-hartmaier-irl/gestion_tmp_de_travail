import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: Request) {
  try {
    const email = req.headers.get("x-user-email");
    if (!email) {
      return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 8889,
      user: "root",
      password: "root",
      database: "gestion_tmp_travail",
    });

    // Récupération de l'utilisateur
    const [userRows]: any = await connection.execute(
      `SELECT id_user, nom, prenom, solde_conge, solde_hsup, photo
       FROM user WHERE mail = ? LIMIT 1`,
      [email]
    );

    if (userRows.length === 0) {
      await connection.end();
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const user = userRows[0];

    // Récupération des demandes
    const [demandeRows]: any = await connection.execute(
      `SELECT d.id_demande, d.type, d.date_demande, d.date_debut, d.date_fin, d.statut_demande,
              u.nom, u.prenom, 
              c.nature AS conges_spec,
              h.heure_debut, h.heure_fin, h.heures,
              m.justificatif
       FROM demande d
       LEFT JOIN user u ON d.id_user = u.id_user
       LEFT JOIN conges_spec c ON d.id_demande = c.id_demande
       LEFT JOIN hsup_spec h ON d.id_demande = h.id_demande
       LEFT JOIN maladie_spec m ON d.id_demande = m.id_demande
       ORDER BY d.date_demande DESC`
    );

    await connection.end();

    return NextResponse.json({ user, demandes: demandeRows }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
