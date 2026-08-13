import express from "express";
import etudiantsRoutes from "./routes/etudiants.routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

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

app.use("/etudiants", etudiantsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
