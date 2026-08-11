export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  age: number;
}

// Type utilisé pour la création (id généré automatiquement)
export type EtudiantInput = Omit<Etudiant, "id">;

// Type utilisé pour PATCH (tous les champs optionnels)
export type EtudiantPartialInput = Partial<EtudiantInput>;
