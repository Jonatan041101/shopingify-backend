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
exports.deleteProductList = exports.updateProductList = void 0;
const productListQuery_1 = require("../query/productListQuery");
const products_1 = require("../util/validates/products");
const history_1 = require("../util/validates/history");
const errors_1 = require("../util/errors");
const updateProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, id } = req.body;
    try {
        (0, products_1.validateNumber)(count);
        (0, history_1.validateString)(id);
        const productList = yield (0, productListQuery_1.updateProductListCountQuery)(id, count);
        if (!productList)
            throw new Error(`El producto con ${id} no exite`);
        return res.json({ product: productList });
    }
    catch (error) {
        console.log({ error });
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.updateProductList = updateProductList;
const deleteProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        (0, history_1.validateString)(id);
        const productToDelete = yield (0, productListQuery_1.searchProductListWithIDQuery)(id);
        if (!productToDelete)
            throw new Error(`El producto con id  ${id} no exite`);
        const productList = yield (0, productListQuery_1.deleteProductListQuery)(id);
        if (!productList)
            throw new Error(`El producto con id  ${id} no exite`);
        return res.json({
            message: `El producto con id ${productToDelete === null || productToDelete === void 0 ? void 0 : productToDelete.product.name} se a eliminado de la lista.`,
        });
    }
    catch (error) {
        console.log({ error });
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.deleteProductList = deleteProductList;
