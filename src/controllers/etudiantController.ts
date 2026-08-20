import { NextFunction, Request, Response } from "express";
import { EtudiantInput, EtudiantPartialInput } from "../models/etudiantModel.js";
import {
  createEtudiantService,
  deleteEtudiantService,
  getAllEtudiantsService,
  getEtudiantByIdService,
  patchEtudiantService,
  updateEtudiantService,
} from "../services/etudiantService.js";

export async function getAllEtudiants(req: Request, res: Response, next: NextFunction) {
  try {
    const etudiants = await getAllEtudiantsService();
    res.status(200).json({ success: true, data: etudiants });
  } catch (error) {
    next(error);
  }
}

export async function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const etudiant = await getEtudiantByIdService(id);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
}

export async function createEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body as EtudiantInput;
    const nouvelEtudiant = await createEtudiantService(data);
    res.status(201).json({ success: true, data: nouvelEtudiant });
  } catch (error) {
    next(error);
  }
}

export async function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = req.body as EtudiantInput;
    const etudiant = await updateEtudiantService(id, data);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
}

export async function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = req.body as EtudiantPartialInput;
    const etudiant = await patchEtudiantService(id, data);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
}

export async function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await deleteEtudiantService(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
