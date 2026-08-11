import express from "express";
import etudiantsRoutes from "./routes/etudiants.routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json()); // pour lire le JSON envoyé dans req.body

app.use("/etudiants", etudiantsRoutes);

// Ordre important : notFound puis errorHandler, toujours en dernier
app.use(notFound);
app.use(errorHandler);

export default app;
