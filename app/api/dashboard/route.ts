import { NextResponse } from 'next/server';
import { getDBConnection } from '@/lib/db';

export async function GET() {
  const conn = await getDBConnection();

  try {
    // Récupérer les infos de l'utilisateur admin
    const [userRows] = await conn.query(
      'SELECT solde_conge, solde_hsup, nom, prenom FROM user WHERE id_user = 1'
    );

    // Récupérer toutes les demandes
    const [demandeRows] = await conn.query(`
      SELECT d.*, u.nom, u.prenom, u.photo
      FROM demande d
      JOIN user u ON d.id_user = u.id_user
      ORDER BY d.date_demande DESC
    `);

    // Récupérer les valeurs uniques pour les filtres
    const [types] = await conn.query(`SELECT DISTINCT type FROM demande`);
    const [statuts] = await conn.query(`SELECT DISTINCT statut_demande FROM demande`);
    const [noms] = await conn.query(`SELECT DISTINCT nom FROM user`);
    const [dates] = await conn.query(`SELECT DISTINCT date_demande FROM demande ORDER BY date_demande DESC`);

    return NextResponse.json({
      user: userRows[0],
      demandes: demandeRows,
      filters: { types, statuts, noms, dates },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await conn.end();
  }
}
