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
exports.deleteManyProductsListQuery = exports.deleteProductListQuery = exports.searchProductListWithIDQuery = exports.updateProductListCountQuery = exports.createdProductListQuery = exports.searchProductListQuery = exports.createManyProductListQuery = void 0;
const prisma_1 = require("../db/prisma");
const errors_1 = require("../util/errors");
const createManyProductListQuery = (products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsList = yield prisma_1.prisma.productList.createMany({
            data: products,
        });
        return productsList;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.createManyProductListQuery = createManyProductListQuery;
const searchProductListQuery = (historyId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existProductList = yield prisma_1.prisma.productList.findFirst({
            where: {
                historyId,
                productId,
            },
        });
        return existProductList;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.searchProductListQuery = searchProductListQuery;
const createdProductListQuery = (historyId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productList = yield prisma_1.prisma.productList.create({
            data: {
                productId,
                count: 1,
                historyId,
            },
        });
        return productList;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.createdProductListQuery = createdProductListQuery;
const updateProductListCountQuery = (productId, count) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.searchProductListWithIDQuery)(productId);
        const productListUpdating = yield prisma_1.prisma.productList.update({
            where: {
                id: productId,
            },
            data: {
                count: {
                    increment: count,
                },
            },
        });
        return productListUpdating;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.updateProductListCountQuery = updateProductListCountQuery;
const searchProductListWithIDQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productList = yield prisma_1.prisma.productList.findUnique({
            where: {
                id,
            },
            include: {
                product: true,
            },
        });
        if (!productList)
            throw new Error(`El id ${id} no pertenece a ningun producto de la lista.`);
        return productList;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.searchProductListWithIDQuery = searchProductListWithIDQuery;
const deleteProductListQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productList = yield prisma_1.prisma.productList.delete({
            where: {
                id,
            },
        });
        return productList;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.deleteProductListQuery = deleteProductListQuery;
const deleteManyProductsListQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prisma.productList.deleteMany({
        where: {
            productId: id,
        },
    });
    return product;
});
exports.deleteManyProductsListQuery = deleteManyProductsListQuery;
