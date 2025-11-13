// scripts/hash-passwords.js
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();

(async () => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "gestion_tmp_travail",
  });

  try {
    const [rows] = await connection.execute("SELECT id_user, mdp FROM user");
    console.log(`Found ${rows.length} users, checking passwords...`);

    for (const row of rows) {
      const id = row.id_user;
      const pwd = row.mdp;

      // Détecte si déjà hashé (commence par $2a$ $2b$ $2y$ etc.)
      if (typeof pwd === "string" && /^\$2[aby]\$/.test(pwd)) {
        console.log(`User ${id}: password already hashed — skipping.`);
        continue;
      }

      // Hash and update
      const hashed = await bcrypt.hash(pwd || "", saltRounds);
      await connection.execute("UPDATE user SET mdp = ? WHERE id_user = ?", [hashed, id]);
      console.log(`User ${id}: password hashed.`);
    }

    console.log("Migration terminée.");
  } catch (err) {
    console.error("Erreur migration :", err);
  } finally {
    await connection.end();
  }
})();
