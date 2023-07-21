import { Request } from 'express';
import { CategoryName, CreatedProduct } from '../../types/types';
export const validteProductCreated = (
  req: Request
): CreatedProduct & CategoryName => {
  if (!req.body.image) throw new Error('No has agregado una imagen');
  if (!req.body.categoryName)
    throw new Error('No has agregado nombre a la categoria');
  if (!req.body.name) throw new Error('No has ingresado un nombre');
  if (!req.body.price)
    throw new Error('No  has ingresado un precio al producto');
  if (!req.body.stock) throw new Error('No has agregado un stock');
  if (!req.body.stock.count)
    throw new Error('No has agreagdo un count en el STOCK');
  const { image, categoryName, name, price, stock } = req.body;
  if (typeof image !== 'string')
    throw new Error(`La imagen ${image} debe ser un string`);
  if (typeof categoryName !== 'string')
    throw new Error(
      `El nombre de la categoria ${categoryName} debe ser un string`
    );
  if (typeof name !== 'string')
    throw new Error(`El nombre del producto ${name} no es un string`);
  if (isNaN(Number(price))) throw new Error(`El precio ${price} no es numero`);
  if (!('count' in stock))
    throw new Error(`El stock del producto no tiene un contador`);
  if (isNaN(Number(stock.count)))
    throw new Error(`El contador de stock ${stock.count} no es un number`);
  return {
    image: req.body.image,
    categoryName: req.body.categoryName,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  } as CreatedProduct & CategoryName;
};
