import { Response } from 'express';
export const MSG_BAD_LOGIN = 'La contraseña o usuario es incorrecto';
export const errorQuery = (res: Response, error: unknown) => {
  const ERROR = error as Error;
  res.status(500).json({ message: ERROR.message });
};
export const errorFunction = (error: unknown) => {
  const ERROR = error as Error;
  throw new Error(ERROR.message);
};
