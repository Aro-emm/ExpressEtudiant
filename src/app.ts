import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import etudiantsRoutes from "./routes/etudiantsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

app.use("/auth", authRoutes);
app.use("/etudiants", etudiantsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
