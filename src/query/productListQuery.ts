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
// await prisma.productList.update({
//  where: {
//    id: searchProduct.id,
//  },
//  data: {
//    count: searchProduct.count + 1,
//  },
// })
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
