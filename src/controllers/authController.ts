import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/usersData.js';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const user = users.find((userItem) => userItem.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { userId: user.id, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // Keep the session token in an httpOnly cookie so client-side code cannot read it.
  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({ message: 'Logged in successfully' });
}

export function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}
