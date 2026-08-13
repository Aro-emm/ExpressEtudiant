"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEtudiants = getAllEtudiants;
exports.getEtudiantById = getEtudiantById;
exports.createEtudiant = createEtudiant;
exports.updateEtudiant = updateEtudiant;
exports.patchEtudiant = patchEtudiant;
exports.deleteEtudiant = deleteEtudiant;
const etudiants_data_1 = require("../data/etudiants.data");
const AppError_1 = require("../middlewares/AppError");
// GET /etudiants -> 200
function getAllEtudiants(req, res) {
    res.status(200).json({ success: true, data: etudiants_data_1.etudiants });
}
// GET /etudiants/:id -> 200 ou 404
function getEtudiantById(req, res, next) {
    const id = Number(req.params.id);
    const etudiant = etudiants_data_1.etudiants.find((e) => e.id === id);
    if (!etudiant) {
        return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }
    res.status(200).json({ success: true, data: etudiant });
}
// POST /etudiants -> 201
function createEtudiant(req, res, next) {
    const { nom, prenom, email, age } = req.body;
    if (!nom || !prenom || !email || age === undefined) {
        return next(new AppError_1.AppError("Champs requis : nom, prenom, email, age", 400));
    }
    const nouvelEtudiant = { id: etudiants_data_1.nextId, nom, prenom, email, age };
    etudiants_data_1.etudiants.push(nouvelEtudiant);
    (0, etudiants_data_1.incrementNextId)();
    res.status(201).json({ success: true, data: nouvelEtudiant });
}
// PUT /etudiants/:id -> 200 (remplacement complet)
function updateEtudiant(req, res, next) {
    const id = Number(req.params.id);
    const index = etudiants_data_1.etudiants.findIndex((e) => e.id === id);
    if (index === -1) {
        return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }
    const { nom, prenom, email, age } = req.body;
    if (!nom || !prenom || !email || age === undefined) {
        return next(new AppError_1.AppError("PUT nécessite tous les champs : nom, prenom, email, age", 400));
    }
    etudiants_data_1.etudiants[index] = { id, nom, prenom, email, age };
    res.status(200).json({ success: true, data: etudiants_data_1.etudiants[index] });
}
// PATCH /etudiants/:id -> 200 (mise à jour partielle)
function patchEtudiant(req, res, next) {
    const id = Number(req.params.id);
    const index = etudiants_data_1.etudiants.findIndex((e) => e.id === id);
    if (index === -1) {
        return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }
    const updates = req.body;
    etudiants_data_1.etudiants[index] = { ...etudiants_data_1.etudiants[index], ...updates };
    res.status(200).json({ success: true, data: etudiants_data_1.etudiants[index] });
}
// DELETE /etudiants/:id -> 204
function deleteEtudiant(req, res, next) {
    const id = Number(req.params.id);
    const index = etudiants_data_1.etudiants.findIndex((e) => e.id === id);
    if (index === -1) {
        return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
    }
    etudiants_data_1.etudiants.splice(index, 1);
    res.status(204).send();
}
