"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const etudiants_routes_1 = __importDefault(require("./routes/etudiants.routes"));
const notFound_1 = require("./middlewares/notFound");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // pour lire le JSON envoyé dans req.body
app.use("/etudiants", etudiants_routes_1.default);
// Ordre important : notFound puis errorHandler, toujours en dernier
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
