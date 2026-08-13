import pool from "../config/db";
import { Etudiant, EtudiantInput, EtudiantPartialInput } from "../Model/etudiant.model";

export async function getAllEtudiantsRepo(): Promise<Etudiant[]> {
  const result = await pool.query<Etudiant>(
    "SELECT id, nom, prenom, email, age FROM etudiants ORDER BY id ASC"
  );
  return result.rows;
}

export async function getEtudiantByIdRepo(id: number): Promise<Etudiant | null> {
  const result = await pool.query<Etudiant>(
    "SELECT id, nom, prenom, email, age FROM etudiants WHERE id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}

export async function createEtudiantRepo(data: EtudiantInput): Promise<Etudiant> {
  const { nom, prenom, email, age } = data;

  const result = await pool.query<Etudiant>(
    `INSERT INTO etudiants (nom, prenom, email, age)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nom, prenom, email, age`,
    [nom, prenom, email, age]
  );

  return result.rows[0];
}

export async function updateEtudiantRepo(id: number, data: EtudiantInput): Promise<Etudiant | null> {
  const { nom, prenom, email, age } = data;

  const result = await pool.query<Etudiant>(
    `UPDATE etudiants
     SET nom = $1, prenom = $2, email = $3, age = $4
     WHERE id = $5
     RETURNING id, nom, prenom, email, age`,
    [nom, prenom, email, age, id]
  );

  return result.rows[0] ?? null;
}

export async function patchEtudiantRepo(id: number, data: EtudiantPartialInput): Promise<Etudiant | null> {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return getEtudiantByIdRepo(id);
  }

  const fields = entries.map(([key], index) => `${key} = $${index + 1}`);
  const values = entries.map(([, value]) => value);

  const result = await pool.query<Etudiant>(
    `UPDATE etudiants
     SET ${fields.join(", ")}
     WHERE id = $${entries.length + 1}
     RETURNING id, nom, prenom, email, age`,
    [...values, id]
  );

  return result.rows[0] ?? null;
}

export async function deleteEtudiantRepo(id: number): Promise<Etudiant | null> {
  const result = await pool.query<Etudiant>(
    `DELETE FROM etudiants
     WHERE id = $1
     RETURNING id, nom, prenom, email, age`,
    [id]
  );

  return result.rows[0] ?? null;
}
