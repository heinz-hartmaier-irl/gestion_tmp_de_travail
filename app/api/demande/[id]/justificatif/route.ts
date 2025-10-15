import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";
import { verify } from "jsonwebtoken";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const idDemande = params.id;
    const body = await req.json();
    const { justificatif } = body;

    if (!justificatif) return NextResponse.json({ success: false, error: "Aucun texte fourni" }, { status: 400 });

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    await connection.execute(
      "UPDATE demande SET justificatif = ? WHERE id_demande = ? AND id_user = ? AND type = 'hsup'",
      [justificatif, idDemande, userId]
    );
    await connection.end();

    return NextResponse.json({ success: true, justificatif });
  } catch (err) {
    console.error("Erreur PATCH justificatif:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
