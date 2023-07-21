import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { Product } from '../data/types';
import { errorQuery } from '../util/errors';
import {
  createProductQuery,
  getProductsQuery,
  searchProductQuery,
} from '../query/productQuery';
import { validteProductCreated } from '../util/validates/products';
import {
  createdCategory,
  searchingCategoryQuery,
} from '../query/categoryQuery';
import { CategoryName, CreatedProduct } from '../types/types';
export type ProductCreate = Omit<Product, 'categoryId'> & {
  categoryName: string;
};
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getProductsQuery();
    return res.json({ products });
  } catch (error) {
    errorQuery(res, error);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  // Validamos todos los campos
  req.body as CreatedProduct & CategoryName;
  console.log({ body: req.body });

  try {
    const newProduct = validteProductCreated(req.body);

    const category = await searchingCategoryQuery(newProduct.category);
    // Creamos el objeto con el id de la categoria si tiene si no le damos un valor por defecto
    newProduct.categoryId = category?.id ?? '';
    if (!category) {
      const newCategory = await createdCategory(newProduct.category);
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
    // errorQuery(res, error);
    res.status(500).json({ message: '' });
  }
};
interface IdProduct {
  id: string;
}

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
    const product = await searchProductQuery(id);

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
      const productName = await searchProductQuery(PRODUCT.product.id);
      const prod = await deleteProductExist(PRODUCT.product.id);
      if (!prod || !productName)
        throw new Error(`El producto con id ${id} no existe.`);
      return res.json({
        message: `Producto ${productName?.name} eliminado de la lista y de la lista de productos`,
      });
    }
    const productName = await searchProductQuery(id);
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
