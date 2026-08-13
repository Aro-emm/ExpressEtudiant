import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/AppError";
import { EtudiantInput, EtudiantPartialInput } from "../models/etudiant.model";
import { query } from "../config/database";

// GET /etudiants -> 200
export async function getAllEtudiants(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await query("SELECT * FROM etudiants ORDER BY id");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
}

// GET /etudiants/:id -> 200 ou 404
export async function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("L'id doit être un nombre valide", 400));
  }

  try {
    const result = await query("SELECT * FROM etudiants WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

// POST /etudiants -> 201
export async function createEtudiant(req: Request, res: Response, next: NextFunction) {
  const { nom, prenom, email, age } = req.body as EtudiantInput;

  if (!nom || !prenom || !email || age === undefined) {
    return next(new AppError("Champs requis : nom, prenom, email, age", 400));
  }

  try {
    const result = await query(
      "INSERT INTO etudiants (nom, prenom, email, age) VALUES ($1, $2, $3, $4) RETURNING *",
      [nom, prenom, email, age]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error?.code === "23505") {
      return next(new AppError("Un étudiant avec cet email existe déjà", 409));
    }
    next(error);
  }
}

// PUT /etudiants/:id -> 200 (remplacement complet)
export async function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("L'id doit être un nombre valide", 400));
  }

  const { nom, prenom, email, age } = req.body as EtudiantInput;
  if (!nom || !prenom || !email || age === undefined) {
    return next(new AppError("PUT nécessite tous les champs : nom, prenom, email, age", 400));
  }

  try {
    const result = await query(
      "UPDATE etudiants SET nom = $1, prenom = $2, email = $3, age = $4 WHERE id = $5 RETURNING *",
      [nom, prenom, email, age, id]
    );

    if (result.rowCount === 0) {
      return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error?.code === "23505") {
      return next(new AppError("Un étudiant avec cet email existe déjà", 409));
    }
    next(error);
  }
}

// PATCH /etudiants/:id -> 200 (mise à jour partielle)
export async function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("L'id doit être un nombre valide", 400));
  }

  const updates = req.body as EtudiantPartialInput;

  if (Object.keys(updates).length === 0) {
    return next(new AppError("Aucune donnée à mettre à jour", 400));
  }

  try {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index += 1;
    }

    values.push(id);

    const result = await query(
      `UPDATE etudiants SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
      values
    );

    if (result.rowCount === 0) {
      return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    if (error?.code === "23505") {
      return next(new AppError("Un étudiant avec cet email existe déjà", 409));
    }
    next(error);
  }
}

// DELETE /etudiants/:id -> 204
export async function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("L'id doit être un nombre valide", 400));
  }

  try {
    const result = await query("DELETE FROM etudiants WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
