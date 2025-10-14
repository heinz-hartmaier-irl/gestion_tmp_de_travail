import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });

    const decoded: any = verify(token, process.env.JWT_SECRET!);

    if (decoded.poste !== "admin" && decoded.poste !== "RH") {
      return NextResponse.json({ success: false, error: "Accès refusé" }, { status: 403 });
    }

    const idDemande = params.id;
    const body = await req.json();
    const { statut } = body;

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    await connection.execute("UPDATE demande SET statut_demande = ? WHERE id_demande = ?", [statut, idDemande]);
    await connection.end();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API update statut:", err);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
