import { Request } from 'express';
import { Login } from '../types/types';

export const validateLogin = (req: Request): Login => {
  const { user, password } = req.body;
  if (typeof user !== 'string' || typeof password !== 'string') {
    throw new Error('Todos los datos tiene que ser de tipo string.');
  }
  if (user.trim().length === 0 || password.trim().length === 0) {
    throw new Error('Completa todos los campos.');
  }
  return {
    user,
    password,
  };
};
