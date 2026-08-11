# API Étudiants — CRUD REST (Express + TypeScript)

## Installation

```bash
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

## Structure du projet

```
src/
  models/etudiant.model.ts        -> types TypeScript
  data/etudiants.data.ts          -> "base de données" en mémoire
  controllers/etudiants.controller.ts -> logique CRUD
  routes/etudiants.routes.ts      -> définition des routes
  middlewares/AppError.ts         -> classe d'erreur custom
  middlewares/notFound.ts         -> gestion des routes 404
  middlewares/errorHandler.ts     -> gestion centralisée des erreurs
  app.ts                          -> configuration Express
  server.ts                       -> démarrage du serveur
```

## Routes disponibles

| Action                     | Méthode | URL              | Code succès |
|-----------------------------|---------|------------------|-------------|
| Lister tous les étudiants   | GET     | /etudiants       | 200         |
| Lire un étudiant précis     | GET     | /etudiants/:id   | 200         |
| Créer un étudiant           | POST    | /etudiants       | 201         |
| Modifier (complet)          | PUT     | /etudiants/:id   | 200         |
| Modifier (partiel)          | PATCH   | /etudiants/:id   | 200         |
| Supprimer                   | DELETE  | /etudiants/:id   | 204         |

## Tester avec Postman / Thunder Client

1. **GET** `http://localhost:3000/etudiants`
   -> renvoie la liste des 2 étudiants de départ (code 200)

2. **GET** `http://localhost:3000/etudiants/1`
   -> renvoie Jean Rakoto (code 200)
   -> essaie `/etudiants/99` pour voir l'erreur 404 centralisée

3. **POST** `http://localhost:3000/etudiants`
   Body (JSON) :
   ```json
   {
     "nom": "Andria",
     "prenom": "Tojo",
     "email": "tojo.andria@mail.com",
     "age": 20
   }
   ```
   -> code 201, l'étudiant est ajouté avec un nouvel id
   -> essaie d'envoyer un body incomplet pour voir l'erreur 400

4. **PUT** `http://localhost:3000/etudiants/1`
   Body (JSON, tous les champs obligatoires) :
   ```json
   {
     "nom": "Rakoto",
     "prenom": "Jean",
     "email": "jean.rakoto2@mail.com",
     "age": 23
   }
   ```
   -> code 200, remplacement complet

5. **PATCH** `http://localhost:3000/etudiants/2`
   Body (JSON, champs optionnels) :
   ```json
   { "age": 24 }
   ```
   -> code 200, mise à jour partielle

6. **DELETE** `http://localhost:3000/etudiants/2`
   -> code 204 (pas de contenu renvoyé)
   -> refais un GET pour vérifier que l'étudiant a disparu

## Gestion centralisée des erreurs

Toute erreur "métier" est levée via `next(new AppError(message, statusCode))`
dans les controllers, plutôt que d'écrire `res.status(...).json(...)` partout.
Elle est interceptée en un seul endroit : `middlewares/errorHandler.ts`,
branché tout en bas de `app.ts`. Ça évite de dupliquer la logique de
formatage des erreurs dans chaque route.
