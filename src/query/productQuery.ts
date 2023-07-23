import { prisma } from '../db/prisma';
import { CreatedProduct } from '../types/types';
import { errorFunction } from '../util/errors';
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
        stock: {
          select: {
            count: true,
            id: true,
          },
        },
      },
    });
    return product;
  } catch (error) {
    errorFunction(error);
  }
};
export const searchProductQuery = async (id: string) => {
  try {
    const productoName = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return productoName;
  } catch (error) {
    errorFunction(error);
  }
};
export const getProductsQuery = async () => {
  try {
    const products = await prisma.category.findMany({
      include: {
        product: {
          include: {
            category: true,
            stock: {
              select: {
                count: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return products;
  } catch (error) {
    errorFunction(error);
  }
};
export const deleteProductQuery = async (id: string) => {
  const prod = await prisma.product.delete({
    where: {
      id,
    },
  });
  return prod;
};
export const updateProductCountQuery = async (id: string, count: number) => {
  try {
    const stock = await prisma.stock.update({
      where: {
        productId: id,
      },
      data: {
        count: {
          decrement: count,
        },
      },
    });
    return stock;
  } catch (error) {
    errorFunction(error);
  }
};
