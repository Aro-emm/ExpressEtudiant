export interface User {
  id: number;
  email: string;
  password: string; // hashed
  role?: string;
}
