import { Request, Response } from 'express';
import {
  deleteProductListQuery,
  searchProductListWithIDQuery,
  updateProductListCountQuery,
} from '../query/productListQuery';
import { validateNumber } from '../util/validates/products';
import { validateString } from '../util/validates/history';
import { errorQuery } from '../util/errors';

interface ProductListSearch {
  id: string;
  count: number;
}

export const updateProductList = async (req: Request, res: Response) => {
  const { count, id } = req.body as ProductListSearch;
  try {
    validateNumber(count);
    validateString(id);
    const productList = await updateProductListCountQuery(id, count);
    if (!productList) throw new Error(`El producto con ${id} no exite`);
    return res.json({ product: productList });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const deleteProductList = async (req: Request, res: Response) => {
  const { id } = req.body as ProductListSearch;

  try {
    validateString(id);
    const productToDelete = await searchProductListWithIDQuery(id);
    if (!productToDelete) throw new Error(`El producto con id  ${id} no exite`);
    const productList = await deleteProductListQuery(id);
    if (!productList) throw new Error(`El producto con id  ${id} no exite`);
    return res.json({
      message: `El producto con id ${productToDelete?.product.name} se a eliminado de la lista.`,
    });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};
