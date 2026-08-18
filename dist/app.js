"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const etudiants_routes_1 = __importDefault(require("./routes/etudiants.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const notFound_1 = require("./middlewares/notFound");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenue sur l'API des étudiants",
        routes: [
            "GET /etudiants",
            "GET /etudiants/:id",
            "POST /etudiants",
            "PUT /etudiants/:id",
            "PATCH /etudiants/:id",
            "DELETE /etudiants/:id",
        ],
    });
});
app.use("/auth", auth_routes_1.default);
app.use("/etudiants", etudiants_routes_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
