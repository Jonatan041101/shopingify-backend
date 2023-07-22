import { Request, Response } from 'express';
import { errorQuery } from '../util/errors';
import {
  createProductQuery,
  deleteProductQuery,
  getProductsQuery,
  searchProductQuery,
} from '../query/productQuery';
import { validteProductCreated } from '../util/validates/products';
import {
  createdCategory,
  searchingCategoryQuery,
} from '../query/categoryQuery';
import { CategoryName, CreatedProduct, ID } from '../types/types';
import {
  deleteManyProductsListQuery,
  searchProductListWithIDQuery,
} from '../query/productListQuery';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getProductsQuery();
    console.log({ products });

    return res.json({ products });
  } catch (error) {
    errorQuery(res, error);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  // Validamos todos los campos
  req.body as CreatedProduct & CategoryName;

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
    errorQuery(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as ID;

    const productList = await deleteManyProductsListQuery(id);
    const product = await searchProductQuery(id);

    if (productList.count === 0 && product) {
      const PRODUCT = await searchProductListWithIDQuery(id);

      if (!PRODUCT) {
        const deleteProduct = await deleteProductQuery(id);
        if (!deleteProduct)
          throw new Error(`No se encontro el producto con id ${id}`);
        return res.json({
          message: `Producto ${product.name} sin historial eliminado`,
        });
      }
      await deleteManyProductsListQuery(PRODUCT.product.id);
      const productName = await searchProductQuery(PRODUCT.product.id);
      const prod = await deleteProductQuery(PRODUCT.product.id);
      if (!prod || !productName)
        throw new Error(`El producto con id ${id} no existe.`);
      return res.json({
        message: `Producto ${productName?.name} eliminado de la lista y de la lista de productos`,
      });
    }
    const productName = await searchProductQuery(id);
    const prod = await deleteProductQuery(id);
    if (!prod || !productName)
      throw new Error(`El producto con id ${id} no existe.`);
    res.json({
      message: `Producto ${productName?.name} eliminado de la lista y de la lista de productos`,
    });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};
