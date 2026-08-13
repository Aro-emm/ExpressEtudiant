"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextId = exports.etudiants = void 0;
exports.incrementNextId = incrementNextId;
// "Base de données" en mémoire (redémarre à zéro à chaque relance du serveur)
exports.etudiants = [
    { id: 1, nom: "Rakoto", prenom: "Jean", email: "jean.rakoto@mail.com", age: 21 },
    { id: 2, nom: "Rasoa", prenom: "Marie", email: "marie.rasoa@mail.com", age: 22 },
];
// Compteur simple pour générer les prochains id
exports.nextId = 3;
function incrementNextId() {
    exports.nextId += 1;
}
