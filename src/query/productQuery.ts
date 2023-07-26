import { prisma } from '../db/prisma';
import { CreatedProduct, UpdateProduct } from '../types/types';
import { errorFunction } from '../util/errors';
import { createdCategory, searchingCategoryQuery } from './categoryQuery';
import { deleteStock } from './stockQuery';
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
    const productName = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    return productName;
  } catch (error) {
    errorFunction(error);
  }
};
export const getProductsQuery = async () => {
  try {
    const products = await prisma.category.findMany({
      include: {
        product: {
          where: {
            suspense: false,
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
        },
      },
    });
    console.log({ products });

    return products;
  } catch (error) {
    errorFunction(error);
  }
};
export const deleteProductQuery = async (id: string) => {
  console.log({ id });
  const stock = await deleteStock(id);
  const prod = await prisma.product.delete({
    where: {
      id,
    },
  });
  console.log({ prod, stock });

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
      select: {
        productId: true,
        count: true,
      },
    });
    return stock;
  } catch (error) {
    errorFunction(error);
  }
};
export const utilUpdateProduct = async (
  product: UpdateProduct,
  categoryId: string
) => {
  try {
    const productUpdate = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        category: {
          connect: {
            id: categoryId,
          },
        },
        name: product.name,
        note: product.note,
        image: product.image,
        price: product.price,
        stock: {
          update: {
            count: product.stock.count,
          },
        },
      },
      include: {
        stock: true,
        category: true,
      },
    });
    return productUpdate;
  } catch (error) {
    errorFunction(error);
  }
};
export const updateProductQuery = async (product: UpdateProduct) => {
  try {
    const category = await searchingCategoryQuery(product.category);
    if (!category) {
      const newCategory = await createdCategory(product.category);
      if (!newCategory)
        throw new Error(
          'Ocurrio un error en la creacion de la categoria porfavor seleccione una que este en la lista.'
        );
      const productUpdate = await utilUpdateProduct(product, newCategory?.id);
      return productUpdate;
    }
    const productUpdate = await utilUpdateProduct(product, category.id);
    return productUpdate;
  } catch (error) {
    errorFunction(error);
  }
};

export const suspeseProductQuery = async (id: string) => {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        suspense: true,
      },
    });
    return product;
  } catch (error) {
    errorFunction(error);
  }
};
