"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("./AppError");
// IMPORTANT : 4 paramètres = Express le reconnaît comme error handler.
// Doit être branché en DERNIER dans app.ts, après toutes les routes.
function errorHandler(err, req, res, next) {
    const statusCode = err instanceof AppError_1.AppError ? err.statusCode : 500;
    const message = err.message || "Erreur interne du serveur";
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${statusCode} : ${message}`);
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}
