"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const AppError_1 = require("./AppError");
// Se déclenche si aucune route ne correspond à l'URL demandée
function notFound(req, res, next) {
    next(new AppError_1.AppError(`Route ${req.method} ${req.originalUrl} introuvable`, 404));
}
