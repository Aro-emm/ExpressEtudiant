import { Etudiant } from "../models/etudiantModel.js";

// "Base de données" en mémoire (redémarre à zéro à chaque relance du serveur)
export const etudiants: Etudiant[] = [
  { id: 1, nom: "Rakoto", prenom: "Jean", email: "jean.rakoto@mail.com", age: 21 },
  { id: 2, nom: "Rasoa", prenom: "Marie", email: "marie.rasoa@mail.com", age: 22 },
];

// Compteur simple pour générer les prochains id
export let nextId = 3;

export function incrementNextId() {
  nextId += 1;
}
