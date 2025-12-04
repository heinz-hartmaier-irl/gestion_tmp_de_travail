import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const userId = parseInt(context.params.id);
  if (isNaN(userId)) {
    return NextResponse.json({ success: false, error: "ID utilisateur invalide" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const allowedFields = ["nom", "prenom", "poste", "mail", "solde_hsup", "jours_conge_pris", "mdp"];
    const updates: string[] = [];
    const values: any[] = [];

    allowedFields.forEach((field) => {
      if (field in body) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    });

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: "Aucun champ à mettre à jour" }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gestion_tmp_travail"
    });

    const [rows]: any = await connection.execute(`SELECT * FROM user WHERE id_user = ?`, [userId]);
    const oldData = rows[0];

    await connection.execute(`UPDATE user SET ${updates.join(", ")} WHERE id_user = ?`, [...values, userId]);

    for (const field of allowedFields) {
      if (field in body) {
        const oldValue = oldData[field];
        const newValue = body[field];

        await connection.execute(
          `INSERT INTO historique 
            (user_id, table_name, record_id, action, field_name, old_value, new_value, message)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            'user',
            userId,
            'UPDATE',
            field,
            oldValue,
            newValue,
            `Modification de ${field} de ${oldValue} à ${newValue}`
          ]
        );
      }
    }

    await connection.end();
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Erreur PATCH /user-setting/[id]:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
