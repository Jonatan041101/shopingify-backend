import { Request, Response } from 'express';
import { errorQuery } from '../util/errors';
import {
  createProductQuery,
  deleteProductQuery,
  getProductsQuery,
  searchProductQuery,
  suspeseProductQuery,
  updateProductQuery,
} from '../query/productQuery';
import {
  validateNumber,
  validteProductCreated,
} from '../util/validates/products';
import {
  createdCategory,
  searchingCategoryQuery,
} from '../query/categoryQuery';
import {
  CategoryName,
  CreatedProduct,
  ID,
  UpdateProduct,
} from '../types/types';
import { searchProductWithProductId } from '../query/productListQuery';
import { validateString } from '../util/validates/history';

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

    const productList = await searchProductWithProductId(id);
    const product = await searchProductQuery(id);
    console.log({ productList, product });
    if (productList && product && productList > 0) {
      const productUpdate = await suspeseProductQuery(id);
      return res.json({
        message: `El producto ${productUpdate?.name} fue suspendido debido a que tiene historial`,
      });
    }
    const prod = await deleteProductQuery(id);
    if (!prod) throw new Error(`El producto con id ${id} no existe.`);
    res.json({
      message: `Producto ${prod?.name} eliminado de la lista y de la lista de productos`,
    });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, category, image, name, note, price, stock } =
      req.body as UpdateProduct;
    validateString(id);
    validateString(image);
    validateString(name);
    validateString(category);
    validateNumber(price);
    if (!stock) throw new Error('No has agregado un stock');
    if (!('count' in stock))
      throw new Error(`El stock del producto no tiene un contador`);
    const updateProduct = await updateProductQuery(req.body);
    return res.json({ product: updateProduct });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};
