import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { Product } from '../data/types';
import { errorQuery } from '../util/errors';
import { createProductQuery } from '../query/productQuery';
import { validteProductCreated } from '../util/validates/products';
import {
  createdCategory,
  searchingCategoryQuery,
} from '../query/categoryQuery';
export type ProductCreate = Omit<Product, 'categoryId'> & {
  categoryName: string;
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.category.findMany({
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
    return res.json({ products });
  } catch (error) {
    const ERROR = error as Error;
    return ERROR.message;
  }
};
export const createProduct = async (req: Request, res: Response) => {
  // Validamos todos los campos
  const newProduct = validteProductCreated(req);
  try {
    const category = await searchingCategoryQuery(newProduct.categoryName);
    // Creamos el objeto con el id de la categoria si tiene si no le damos un valor por defecto

    if (!category) {
      const newCategory = await createdCategory(newProduct.categoryName);
      // Para no volver a crear el objeto actualizamos su valor de CategoryId y le damos el  de la nueva categoria creada si no existe la anterior
      if (!newCategory) {
        throw new Error(`Error en la creacion de la categoria ${newCategory}`);
      }
      newProduct.categoryId = newCategory.id;
      const product = await createProductQuery(newProduct);
      return res.json({ product });
    }

    const product = await createProductQuery(newProduct);

    return res.json({ product });
  } catch (error) {
    console.log({ error });
    const ERROR = error as Error;
    errorQuery(res, ERROR);
  }
};
interface IdProduct {
  id: string;
}

const searchProduct = async (id: string) => {
  const productoName = await prisma.product.findFirst({
    where: {
      id,
    },
  });
  return productoName;
};
const deleteProductExist = async (id: string) => {
  const prod = await prisma.product.delete({
    where: {
      id,
    },
  });
  return prod;
};
const deleteManyProductsList = async (id: string) => {
  const product = await prisma.productList.deleteMany({
    where: {
      productId: id,
    },
  });
  return product;
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as IdProduct;

    const productList = await deleteManyProductsList(id);
    const product = await searchProduct(id);

    if (productList.count === 0 && product) {
      const PRODUCT = await prisma.productList.findFirst({
        where: {
          id,
        },
        include: {
          product: true,
        },
      });

      if (!PRODUCT) {
        const deleteProduct = await deleteProductExist(id);
        if (!deleteProduct)
          throw new Error(`No se encontro el producto con id ${id}`);
        return res.json({
          message: `Producto ${product.name} sin historial eliminado`,
        });
      }
      await deleteManyProductsList(PRODUCT.product.id);
      const productName = await searchProduct(PRODUCT.product.id);
      const prod = await deleteProductExist(PRODUCT.product.id);
      if (!prod || !productName)
        throw new Error(`El producto con id ${id} no existe.`);
      return res.json({
        message: `Producto ${productName?.name} eliminado de la lista y de la lista de productos`,
      });
    }
    const productName = await searchProduct(id);
    const prod = await deleteProductExist(id);
    if (!prod || !productName)
      throw new Error(`El producto con id ${id} no existe.`);
    res.json({
      message: `Producto ${productName?.name} eliminado de la lista y de la lista de productos`,
    });
  } catch (error) {
    console.log({ error });
    const ERROR = error as Error;
    errorQuery(res, ERROR);
  }
};
