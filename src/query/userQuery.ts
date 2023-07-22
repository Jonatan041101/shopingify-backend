import { prisma } from '../db/prisma';
import { Login } from '../types/types';
import { errorFunction, MSG_BAD_LOGIN } from '../util/errors';

export const searchUser = async (userName: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        user: userName,
      },
    });
    if (!user) throw new Error(MSG_BAD_LOGIN);
    return user;
  } catch (error) {
    errorFunction(error);
  }
};

export const passwordConfirm = (password: string, receivedPassword: string) => {
  if (password === receivedPassword) return;
  throw new Error(MSG_BAD_LOGIN);
};

export const loginSesionQuery = async (userLogin: Login) => {
  try {
    const user = await searchUser(userLogin.user);
    console.log({ user }, 'USER');

    passwordConfirm(user?.password ?? '', userLogin.password);
    return user;
  } catch (error) {
    errorFunction(error);
  }
};
