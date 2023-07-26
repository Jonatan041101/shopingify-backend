import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';

export const deleteStock = async (productId: string) => {
  try {
    const stock = await prisma.stock.delete({
      where: {
        productId,
      },
    });
    return stock;
  } catch (error) {
    errorFunction(error);
  }
};
