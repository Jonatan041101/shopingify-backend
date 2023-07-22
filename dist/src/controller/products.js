"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const errors_1 = require("../util/errors");
const productQuery_1 = require("../query/productQuery");
const products_1 = require("../util/validates/products");
const categoryQuery_1 = require("../query/categoryQuery");
const productListQuery_1 = require("../query/productListQuery");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productQuery_1.getProductsQuery)();
        return res.json({ products });
    }
    catch (error) {
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validamos todos los campos
    req.body;
    try {
        const newProduct = (0, products_1.validteProductCreated)(req.body);
        const category = yield (0, categoryQuery_1.searchingCategoryQuery)(newProduct.category);
        // Creamos el objeto con el id de la categoria si tiene si no le damos un valor por defecto
        newProduct.categoryId = (_a = category === null || category === void 0 ? void 0 : category.id) !== null && _a !== void 0 ? _a : '';
        if (!category) {
            const newCategory = yield (0, categoryQuery_1.createdCategory)(newProduct.category);
            // Para no volver a crear el objeto actualizamos su valor de CategoryId y le damos el  de la nueva categoria creada si no existe la anterior
            if (!newCategory) {
                throw new Error(`Error en la creacion de la categoria ${newCategory}`);
            }
            newProduct.categoryId = newCategory.id;
            const product = yield (0, productQuery_1.createProductQuery)(newProduct);
            return res.json({ product });
        }
        const product = yield (0, productQuery_1.createProductQuery)(newProduct);
        return res.json({ product });
    }
    catch (error) {
        console.log({ error });
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const productList = yield (0, productListQuery_1.deleteManyProductsListQuery)(id);
        const product = yield (0, productQuery_1.searchProductQuery)(id);
        if (productList.count === 0 && product) {
            const PRODUCT = yield (0, productListQuery_1.searchProductListWithIDQuery)(id);
            if (!PRODUCT) {
                const deleteProduct = yield (0, productQuery_1.deleteProductQuery)(id);
                if (!deleteProduct)
                    throw new Error(`No se encontro el producto con id ${id}`);
                return res.json({
                    message: `Producto ${product.name} sin historial eliminado`,
                });
            }
            yield (0, productListQuery_1.deleteManyProductsListQuery)(PRODUCT.product.id);
            const productName = yield (0, productQuery_1.searchProductQuery)(PRODUCT.product.id);
            const prod = yield (0, productQuery_1.deleteProductQuery)(PRODUCT.product.id);
            if (!prod || !productName)
                throw new Error(`El producto con id ${id} no existe.`);
            return res.json({
                message: `Producto ${productName === null || productName === void 0 ? void 0 : productName.name} eliminado de la lista y de la lista de productos`,
            });
        }
        const productName = yield (0, productQuery_1.searchProductQuery)(id);
        const prod = yield (0, productQuery_1.deleteProductQuery)(id);
        if (!prod || !productName)
            throw new Error(`El producto con id ${id} no existe.`);
        res.json({
            message: `Producto ${productName === null || productName === void 0 ? void 0 : productName.name} eliminado de la lista y de la lista de productos`,
        });
    }
    catch (error) {
        console.log({ error });
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.deleteProduct = deleteProduct;
