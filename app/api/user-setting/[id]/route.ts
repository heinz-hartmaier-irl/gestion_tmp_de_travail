// app/api/user-setting/[id]/route.ts
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  if (isNaN(userId)) return NextResponse.json({ success: false, error: "ID utilisateur invalide" }, { status: 400 });

  try {
    const body = await req.json();
    const updates: string[] = [];
    const values: any[] = [];

    ["solde_hsup", "solde_conge"].forEach((field) => {
      if (field in body) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    });

    if (updates.length === 0)
      return NextResponse.json({ success: false, error: "Aucun champ à mettre à jour" }, { status: 400 });

    const connection = await mysql.createConnection({ host: "localhost", user: "root", password: "", database: "gestion_tmp_travail" });
    await connection.execute(`UPDATE user SET ${updates.join(", ")} WHERE id_user = ?`, [...values, userId]);
    await connection.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur PATCH /user-setting/[id]:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
