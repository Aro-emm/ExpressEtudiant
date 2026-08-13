import { Pool, QueryResultRow } from "pg";

const password = process.env.PGPASSWORD;

if (!password) {
  console.warn("⚠️ PGPASSWORD n'est pas défini. Configure la variable d'environnement avant d'utiliser PostgreSQL.");
}

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "api_student",
  password: password || "",
  port: Number(process.env.PGPORT || 5432),
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
});

export const query = <T extends QueryResultRow = QueryResultRow>(text: string, params: any[] = []) =>
  pool.query<T>(text, params);

export default pool;
