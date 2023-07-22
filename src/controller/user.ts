import { Request, Response } from 'express';
import { errorQuery } from '../util/errors';
import { loginSesionQuery } from '../query/userQuery';
import { validateLogin } from '../util/validates/user';

export const loginSesion = async (req: Request, res: Response) => {
  const userLogin = validateLogin(req);
  try {
    console.log({ userLogin });

    const user = await loginSesionQuery(userLogin);
    console.log({ user });

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
