import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';

export const getDolarQuery = async () => {
  try {
    const dolar = await prisma.dolar.findFirst({
      where: {
        id: '5258b240-54a8-4166-9e97-a7bb051e93b0',
      },
    });
    return dolar;
  } catch (error) {
    errorFunction(error);
  }
};
