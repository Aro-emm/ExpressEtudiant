import { Request, Response, NextFunction } from "express";
import { etudiants, nextId, incrementNextId } from "../data/etudiants.data";
import { AppError } from "../middlewares/AppError";
import { EtudiantInput, EtudiantPartialInput } from "../models/etudiant.model";

// GET /etudiants -> 200
export function getAllEtudiants(req: Request, res: Response) {
  res.status(200).json({ success: true, data: etudiants });
}

// GET /etudiants/:id -> 200 ou 404
export function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const etudiant = etudiants.find((e) => e.id === id);

  if (!etudiant) {
    return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
  }

  res.status(200).json({ success: true, data: etudiant });
}

// POST /etudiants -> 201
export function createEtudiant(req: Request, res: Response, next: NextFunction) {
  const { nom, prenom, email, age } = req.body as EtudiantInput;

  if (!nom || !prenom || !email || age === undefined) {
    return next(new AppError("Champs requis : nom, prenom, email, age", 400));
  }

  const nouvelEtudiant = { id: nextId, nom, prenom, email, age };
  etudiants.push(nouvelEtudiant);
  incrementNextId();

  res.status(201).json({ success: true, data: nouvelEtudiant });
}

// PUT /etudiants/:id -> 200 (remplacement complet)
export function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const index = etudiants.findIndex((e) => e.id === id);

  if (index === -1) {
    return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
  }

  const { nom, prenom, email, age } = req.body as EtudiantInput;
  if (!nom || !prenom || !email || age === undefined) {
    return next(new AppError("PUT nécessite tous les champs : nom, prenom, email, age", 400));
  }

  etudiants[index] = { id, nom, prenom, email, age };
  res.status(200).json({ success: true, data: etudiants[index] });
}

// PATCH /etudiants/:id -> 200 (mise à jour partielle)
export function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const index = etudiants.findIndex((e) => e.id === id);

  if (index === -1) {
    return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
  }

  const updates = req.body as EtudiantPartialInput;
  etudiants[index] = { ...etudiants[index], ...updates };

  res.status(200).json({ success: true, data: etudiants[index] });
}

// DELETE /etudiants/:id -> 204
export function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const index = etudiants.findIndex((e) => e.id === id);

  if (index === -1) {
    return next(new AppError(`Étudiant avec l'id ${id} introuvable`, 404));
  }

  etudiants.splice(index, 1);
  res.status(204).send();
}
