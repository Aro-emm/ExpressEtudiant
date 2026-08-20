import { AppError } from "./AppError.js";
// IMPORTANT : 4 paramètres = Express le reconnaît comme error handler.
// Doit être branché en DERNIER dans app.ts, après toutes les routes.
export function errorHandler(err, req, res, next) {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || "Erreur interne du serveur";
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${statusCode} : ${message}`);
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}
