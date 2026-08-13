export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  age: number;
}

export type EtudiantInput = Omit<Etudiant, "id">;
export type EtudiantPartialInput = Partial<EtudiantInput>;
