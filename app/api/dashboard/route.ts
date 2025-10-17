import { NextResponse } from 'next/server';
import { getDBConnection } from '@/lib/db';

export async function GET() {
  const conn = await getDBConnection();

  try {
    // 🧩 Étape 1 : accepter automatiquement les arrêts maladie
    await conn.query(`
      UPDATE demande 
      SET statut_demande = 'Acceptée'
      WHERE type = 'Arrêt Maladie' 
      AND statut_demande != 'Acceptée'
    `);

    // Étape 2 : Récupérer infos admin
    const [userRows] = await conn.query(`
      SELECT solde_conge, solde_hsup, nom, prenom 
      FROM user 
      WHERE id_user = 1
    `);

    // Étape 3 : Récupérer demandes + justificatifs
    const [demandeRows] = await conn.query(`
      SELECT 
        d.*, 
        u.nom, 
        u.prenom, 
        u.photo,
        m.justificatif
      FROM demande d
      JOIN user u ON d.id_user = u.id_user
      LEFT JOIN maladie_spec m ON d.id_demande = m.id_demande
      ORDER BY d.date_demande DESC
    `);

    // Étape 4 : Récupérer les filtres
    const [types] = await conn.query(`SELECT DISTINCT type FROM demande`);
    const [statuts] = await conn.query(`SELECT DISTINCT statut_demande FROM demande`);
    const [noms] = await conn.query(`SELECT DISTINCT nom FROM user`);
    const [dates] = await conn.query(`SELECT DISTINCT date_demande FROM demande ORDER BY date_demande DESC`);

    // Étape 5 : Retourner le JSON complet
    return NextResponse.json({
      user: userRows[0],
      demandes: demandeRows,
      filters: { types, statuts, noms, dates },
    });

  } catch (error) {
    console.error('Erreur dans /api/dashboard:', error);
    return NextResponse.error();
  } finally {
    await conn.end();
  }
}
