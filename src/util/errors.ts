import { Response } from 'express';
export const MSG_BAD_LOGIN = 'La contraseña o usuario no existe';
export const errorQuery = (res: Response, error: Error) => {
  res.status(500).json({ message: error.message });
};
export const errorFunction = (error: unknown) => {
  const ERROR = error as Error;
  throw new Error(ERROR.message);
};
