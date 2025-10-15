import mysql from "mysql2/promise";

export async function getDBConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gestion_tmp_travail",
    port: 8889,
  });
}
