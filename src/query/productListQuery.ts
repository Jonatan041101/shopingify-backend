import { prisma } from '../db/prisma';
import { ProductHistory } from '../types/types';
import { errorFunction } from '../util/errors';

export const createManyProductListQuery = async (
  products: ProductHistory[]
) => {
  try {
    const productsList = await prisma.productList.createMany({
      data: products,
    });
    return productsList;
  } catch (error) {
    errorFunction(error);
  }
};
