import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { statut } = await req.json();
    const db = await getDBConnection();

    // Récupérer le type de la demande
    const [rows] = await db.execute("SELECT type FROM demande WHERE id_demande = ?", [params.id]);
    const demande: any = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!demande) {
      await db.end();
      return NextResponse.json({ success: false, error: "Demande introuvable" }, { status: 404 });
    }

    let newStatut = statut;

    // Si c’est un arrêt maladie → statut forcé à Acceptée
    if (demande.type === "Arrêt Maladie") {
      newStatut = "Acceptée";

      // On met à jour directement
      await db.execute("UPDATE demande SET statut_demande = ? WHERE id_demande = ?", [newStatut, params.id]);
    } else {
      // Sinon, on met à jour selon le choix admin
      await db.execute("UPDATE demande SET statut_demande = ? WHERE id_demande = ?", [newStatut, params.id]);
    }

    await db.end();
    return NextResponse.json({ success: true, statut: newStatut });
  } catch (error) {
    console.error("Erreur API :", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// 🔹 Route GET pour récupérer un justificatif spécifique
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDBConnection();

    const [rows] = await db.execute(
      `SELECT m.justificatif
       FROM maladie_spec m
       JOIN demande d ON d.id_demande = m.id_demande
       WHERE d.id_demande = ? AND d.type = 'Arrêt Maladie'`,
      [params.id]
    );

    await db.end();

    const data: any = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!data?.justificatif) {
      return NextResponse.json({ success: false, error: "Aucun justificatif trouvé" }, { status: 404 });
    }

    // Retourne juste le chemin du fichier
    return NextResponse.json({
      success: true,
      justificatif: data.justificatif,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du justificatif :", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
