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
export const searchProductWithProductId = async (productId: string) => {
  try {
    const products = await prisma.productList.findMany({
      where: {
        productId,
      },
    });
    console.log({ products });

    return products.length;
  } catch (error) {
    errorFunction(error);
  }
};
export const searchProductListQuery = async (
  historyId: string,
  productId: string
) => {
  try {
    const existProductList = await prisma.productList.findFirst({
      where: {
        historyId,
        productId,
      },
    });
    return existProductList;
  } catch (error) {
    errorFunction(error);
  }
};
export const createdProductListQuery = async (
  historyId: string,
  productId: string
) => {
  try {
    const productList = await prisma.productList.create({
      data: {
        productId,
        count: 1,
        historyId,
      },
    });
    return productList;
  } catch (error) {
    errorFunction(error);
  }
};
export const updateProductListCountQuery = async (
  productId: string,
  count: number
) => {
  try {
    await searchProductListWithIDQuery(productId);
    const productListUpdating = await prisma.productList.update({
      where: {
        id: productId,
      },
      data: {
        count: {
          increment: count,
        },
      },
    });
    return productListUpdating;
  } catch (error) {
    errorFunction(error);
  }
};

export const searchProductListWithIDQuery = async (id: string) => {
  try {
    const productList = await prisma.productList.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
    // console.log({ productList });

    // if (!productList)
    //   throw new Error(
    //     `El id ${id} no pertenece a ningun producto de la lista.`
    //   );
    return productList;
  } catch (error) {
    errorFunction(error);
  }
};
export const deleteProductListQuery = async (id: string) => {
  try {
    const productList = await prisma.productList.delete({
      where: {
        id,
      },
    });
    return productList;
  } catch (error) {
    errorFunction(error);
  }
};
export const deleteManyProductsListQuery = async (id: string) => {
  const product = await prisma.productList.deleteMany({
    where: {
      productId: id,
    },
  });
  return product;
};
