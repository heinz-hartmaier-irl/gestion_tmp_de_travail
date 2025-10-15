import mysql from "mysql2/promise";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // 🔐 Récupération du token depuis le cookie
    const cookieHeader = req.headers.cookie || "";
    const match = cookieHeader.match(/(^|;)\s*token=([^;]+)/);
    const token = match ? match[2] : null;

    if (!token) {
      return res.status(401).json({ error: "Non authentifié" });
    }

    const decoded: any = verify(token, process.env.JWT_SECRET!);

    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "gestion_tmp_travail",
    });

    // 👤 Récupération de l’utilisateur connecté
    const [userRows]: any = await connection.execute(
      "SELECT id_user, nom, prenom, mail, poste, statut, date_entree, solde_conge, solde_hsup FROM user WHERE id_user = ? LIMIT 1",
      [decoded.id]
    );

    if (userRows.length === 0) {
      await connection.end();
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    await connection.end();

    return res.status(200).json({
      user: userRows[0],
    });
  } catch (err: any) {
    console.error("Erreur API /user :", err);
    return res.status(500).json({ error: "Erreur serveur ou token invalide" });
  }
}
