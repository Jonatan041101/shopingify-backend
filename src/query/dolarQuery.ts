import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';

export const getDolarQuery = async () => {
  try {
    const dolar = await prisma.dolar.findFirst();
    return dolar;
  } catch (error) {
    errorFunction(error);
  }
};
