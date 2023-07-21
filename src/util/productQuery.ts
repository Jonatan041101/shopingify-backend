import { prisma } from '../db/prisma';
import { CreatedProduct } from '../types/types';
import { errorFunction } from './errors';

export const createProductQuery = async ({
  categoryId,
  image,
  name,
  note,
  price,
  stock,
}: CreatedProduct) => {
  try {
    if (isNaN(Number(price)) || isNaN(Number(stock.count))) {
      throw new Error('El precio y la cantidad deben ser numeros');
    }
    const product = await prisma.product.create({
      data: {
        image,
        name,
        note,
        categoryId,
        price: Number(price),
        stock: {
          create: {
            count: Number(stock.count),
          },
        },
      },
      include: {
        category: true,
        stock: true,
      },
    });
    return product;
  } catch (error) {
    errorFunction(error);
  }
};
