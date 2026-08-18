import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

// Demo users store (in-memory). Passwords hashed at startup for convenience.
export const users: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: bcrypt.hashSync('userpass', 10),
    role: 'user',
  },
];
