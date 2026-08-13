"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEtudiants = getAllEtudiants;
exports.getEtudiantById = getEtudiantById;
exports.createEtudiant = createEtudiant;
exports.updateEtudiant = updateEtudiant;
exports.patchEtudiant = patchEtudiant;
exports.deleteEtudiant = deleteEtudiant;
const AppError_1 = require("../middlewares/AppError");
const database_1 = require("../config/database");
// GET /etudiants -> 200
async function getAllEtudiants(req, res, next) {
    try {
        const result = await (0, database_1.query)("SELECT * FROM etudiants ORDER BY id");
        res.status(200).json({ success: true, data: result.rows });
    }
    catch (error) {
        next(error);
    }
}
// GET /etudiants/:id -> 200 ou 404
async function getEtudiantById(req, res, next) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new AppError_1.AppError("L'id doit être un nombre valide", 400));
    }
    try {
        const result = await (0, database_1.query)("SELECT * FROM etudiants WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        next(error);
    }
}
// POST /etudiants -> 201
async function createEtudiant(req, res, next) {
    const { nom, prenom, email, age } = req.body;
    if (!nom || !prenom || !email || age === undefined) {
        return next(new AppError_1.AppError("Champs requis : nom, prenom, email, age", 400));
    }
    try {
        const result = await (0, database_1.query)("INSERT INTO etudiants (nom, prenom, email, age) VALUES ($1, $2, $3, $4) RETURNING *", [nom, prenom, email, age]);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        if (error?.code === "23505") {
            return next(new AppError_1.AppError("Un étudiant avec cet email existe déjà", 409));
        }
        next(error);
    }
}
// PUT /etudiants/:id -> 200 (remplacement complet)
async function updateEtudiant(req, res, next) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new AppError_1.AppError("L'id doit être un nombre valide", 400));
    }
    const { nom, prenom, email, age } = req.body;
    if (!nom || !prenom || !email || age === undefined) {
        return next(new AppError_1.AppError("PUT nécessite tous les champs : nom, prenom, email, age", 400));
    }
    try {
        const result = await (0, database_1.query)("UPDATE etudiants SET nom = $1, prenom = $2, email = $3, age = $4 WHERE id = $5 RETURNING *", [nom, prenom, email, age, id]);
        if (result.rowCount === 0) {
            return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        if (error?.code === "23505") {
            return next(new AppError_1.AppError("Un étudiant avec cet email existe déjà", 409));
        }
        next(error);
    }
}
// PATCH /etudiants/:id -> 200 (mise à jour partielle)
async function patchEtudiant(req, res, next) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new AppError_1.AppError("L'id doit être un nombre valide", 400));
    }
    const updates = req.body;
    if (Object.keys(updates).length === 0) {
        return next(new AppError_1.AppError("Aucune donnée à mettre à jour", 400));
    }
    try {
        const fields = [];
        const values = [];
        let index = 1;
        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = $${index}`);
            values.push(value);
            index += 1;
        }
        values.push(id);
        const result = await (0, database_1.query)(`UPDATE etudiants SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`, values);
        if (result.rowCount === 0) {
            return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        if (error?.code === "23505") {
            return next(new AppError_1.AppError("Un étudiant avec cet email existe déjà", 409));
        }
        next(error);
    }
}
// DELETE /etudiants/:id -> 204
async function deleteEtudiant(req, res, next) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return next(new AppError_1.AppError("L'id doit être un nombre valide", 400));
    }
    try {
        const result = await (0, database_1.query)("DELETE FROM etudiants WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return next(new AppError_1.AppError(`Étudiant avec l'id ${id} introuvable`, 404));
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
