"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = exports.validteProductCreated = void 0;
const validteProductCreated = ({ image, category, name, price, stock, note, }) => {
    if (!image)
        throw new Error('No has agregado una imagen');
    if (!category)
        throw new Error('No has agregado nombre a la categoria');
    if (!name)
        throw new Error('No has ingresado un nombre');
    if (!price)
        throw new Error('No  has ingresado un precio al producto');
    if (!stock)
        throw new Error('No has agregado un stock');
    if (!stock.count)
        throw new Error('No has agregado un count en el STOCK');
    if (typeof image !== 'string')
        throw new Error(`La imagen ${image} debe ser un string`);
    if (typeof category !== 'string')
        throw new Error(`El nombre de la categoria ${category} debe ser un string`);
    if (typeof name !== 'string')
        throw new Error(`El nombre del producto ${name} no es un string`);
    if (isNaN(Number(price)))
        throw new Error(`El precio ${price} no es numero`);
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
    };
};
exports.validteProductCreated = validteProductCreated;
const validateNumber = (count) => {
    if (isNaN(Number(count)))
        throw new Error(`El count ${count} no es un numero.`);
    if (typeof count !== 'number')
        throw new Error(`El count ${count} no es un numero.`);
};
exports.validateNumber = validateNumber;
