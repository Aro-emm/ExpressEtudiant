import { AppError } from "../middlewares/AppError.js";
import { EtudiantInput, EtudiantPartialInput } from "../models/etudiantModel.js";
import {
  createEtudiantRepo,
  deleteEtudiantRepo,
  getAllEtudiantsRepo,
  getEtudiantByIdRepo,
  patchEtudiantRepo,
  updateEtudiantRepo,
} from "../repositories/etudiantRepository.js";

function validateRequiredFields(data: Partial<EtudiantInput>, label: string) {
  const { nom, prenom, email, age } = data;

  if (!nom || !prenom || !email || age === undefined) {
    throw new AppError(`${label} nécessite : nom, prenom, email, age`, 400);
  }
}

function validatePartialFields(data: EtudiantPartialInput) {
  const allowedKeys = ["nom", "prenom", "email", "age"];
  const keys = Object.keys(data);

  if (keys.some((key) => !allowedKeys.includes(key))) {
    throw new AppError("Champs non autorisés pour PATCH", 400);
  }
}

export async function getAllEtudiantsService() {
  return await getAllEtudiantsRepo();
}

export async function getEtudiantByIdService(id: number) {
  const etudiant = await getEtudiantByIdRepo(id);

  if (!etudiant) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  return etudiant;
}

export async function createEtudiantService(data: EtudiantInput) {
  validateRequiredFields(data, "POST");
  return await createEtudiantRepo(data);
}

export async function updateEtudiantService(id: number, data: EtudiantInput) {
  const existing = await getEtudiantByIdRepo(id);

  if (!existing) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  validateRequiredFields(data, "PUT");
  const updated = await updateEtudiantRepo(id, data);

  if (!updated) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  return updated;
}

export async function patchEtudiantService(id: number, data: EtudiantPartialInput) {
  const existing = await getEtudiantByIdRepo(id);

  if (!existing) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  validatePartialFields(data);
  const updated = await patchEtudiantRepo(id, data);

  if (!updated) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  return updated;
}

export async function deleteEtudiantService(id: number) {
  const deleted = await deleteEtudiantRepo(id);

  if (!deleted) {
    throw new AppError(`Étudiant avec l'id ${id} introuvable`, 404);
  }

  return deleted;
}
