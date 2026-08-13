import app from "./app";
import { testConnection } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer();
