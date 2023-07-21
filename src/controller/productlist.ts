import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

interface ProductListSearch {
  id: string;
  count: number;
}

export const updateProductList = async (req: Request, res: Response) => {
  const { count, id } = req.body as ProductListSearch;
  console.log({ count, id });

  try {
    const productList = await prisma.productList.update({
      where: {
        id,
      },
      data: {
        count: {
          increment: count,
        },
      },
      include: {
        product: true,
      },
    });
    console.log({ productList });

    if (!productList) throw new Error(`El producto con ${id} no exite`);
    return res.json({ product: productList });
  } catch (error) {
    console.log({ error });
  }
};

export const deleteProductList = async (req: Request, res: Response) => {
  const { id } = req.body as ProductListSearch;

  try {
    const productToDelete = await prisma.productList.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
    if (!productToDelete) throw new Error(`El producto con id  ${id} no exite`);
    const productList = await prisma.productList.delete({
      where: {
        id,
      },
    });
    if (!productList) throw new Error(`El producto con id  ${id} no exite`);
    return res.json({
      message: `El producto con id ${productToDelete?.product.name} se a eliminado de la lista.`,
    });
  } catch (error) {
    console.log({ error });
  }
};
