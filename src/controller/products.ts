import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { Product } from '../data/types';
export type ProductCreate = Omit<Product, 'categoryId'> & {
  categoryName: string;
};
const createProductModel = async (
  image: string,
  name: string,
  note: string,
  id: string,
  price: number
) => {
  const product = await prisma.product.create({
    data: {
      image,
      name,
      note,
      categoryId: id,
      price,
    },
    include: {
      category: true,
    },
  });
  return product;
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
  const { categoryName, image, name, note, price } = req.body as ProductCreate;
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });
    if (!category) {
      const newCategory = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
      const product = await createProductModel(
        image,
        name,
        note,
        newCategory.id,
        price
      );
      return res.json({ product });
    }
    const product = await createProductModel(
      image,
      name,
      note,
      category.id,
      price
    );

    return res.json({ product });
  } catch (error) {
    console.log({ error });
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
  }
};
