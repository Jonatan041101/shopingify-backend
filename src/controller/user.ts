import { Request, Response } from 'express';
import { validateLogin } from '../validates/user';
import { errorQuery } from '../util/errors';
import { loginSesionQuery } from '../query/userQuery';

export const loginSesion = async (req: Request, res: Response) => {
  const userLogin = validateLogin(req);
  try {
    const user = await loginSesionQuery(userLogin);
    res.json({ user });
  } catch (error) {
    const ERROR = error as Error;
    errorQuery(res, ERROR);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const ERROR = error as Error;
    errorQuery(res, ERROR);
  }
};
