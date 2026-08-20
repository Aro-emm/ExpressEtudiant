import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.js";

// Se déclenche si aucune route ne correspond à l'URL demandée
export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} introuvable`, 404));
}
