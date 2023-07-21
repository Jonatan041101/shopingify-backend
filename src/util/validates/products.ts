import { Request } from 'express';
import { CategoryName, CreatedProduct } from '../../types/types';
import { errorFunction } from '../errors';
export const validteProductCreated = ({
  image,
  category,
  name,
  price,
  stock,
  note,
}: CreatedProduct & CategoryName) => {
  if (!image) throw new Error('No has agregado una imagen');
  if (!category) throw new Error('No has agregado nombre a la categoria');
  if (!name) throw new Error('No has ingresado un nombre');
  console.log('HOLA MUNDO Xd');
  if (!price) throw new Error('No  has ingresado un precio al producto');
  if (!stock) throw new Error('No has agregado un stock');
  if (!stock.count) throw new Error('No has agregado un count en el STOCK');
  if (typeof image !== 'string')
    throw new Error(`La imagen ${image} debe ser un string`);
  if (typeof category !== 'string')
    throw new Error(`El nombre de la categoria ${category} debe ser un string`);
  if (typeof name !== 'string')
    throw new Error(`El nombre del producto ${name} no es un string`);
  if (isNaN(Number(price))) throw new Error(`El precio ${price} no es numero`);
  console.log('HOLA MUNDO Xd');
  if (!('count' in stock))
    throw new Error(`El stock del producto no tiene un contador`);
  if (isNaN(Number(stock.count)))
    throw new Error(`El contador de stock ${stock.count} no es un number`);
  return {
    image,
    category,
    name,
    price,
    stock,
    note,
  } as CreatedProduct & CategoryName;
};
