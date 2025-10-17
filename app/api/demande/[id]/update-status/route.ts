import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Config MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_tmp_travail',
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { statut } = await req.json();

  if (!['Acceptée', 'Refusée'].includes(statut)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(
      'UPDATE demande SET statut_demande = ? WHERE id_demande = ?',
      [statut, id]
    );
    await conn.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur', details: err }, { status: 500 });
  }
}
