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
exports.deleteProductQuery = exports.getProductsQuery = exports.searchProductQuery = exports.createProductQuery = void 0;
const prisma_1 = require("../db/prisma");
const errors_1 = require("../util/errors");
const createProductQuery = ({ categoryId, image, name, note, price, stock, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(Number(price)) || isNaN(Number(stock.count))) {
            throw new Error('El precio y la cantidad deben ser numeros');
        }
        const product = yield prisma_1.prisma.product.create({
            data: {
                image,
                name,
                note,
                categoryId,
                price: Number(price),
                stock: {
                    create: {
                        count: Number(stock.count),
                    },
                },
            },
            include: {
                category: true,
                stock: {
                    select: {
                        count: true,
                        id: true,
                    },
                },
            },
        });
        return product;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.createProductQuery = createProductQuery;
const searchProductQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoName = yield prisma_1.prisma.product.findFirst({
            where: {
                id,
            },
        });
        return productoName;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.searchProductQuery = searchProductQuery;
const getProductsQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.prisma.category.findMany({
            include: {
                product: {
                    include: {
                        category: true,
                        stock: {
                            select: {
                                count: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        return products;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.getProductsQuery = getProductsQuery;
const deleteProductQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield prisma_1.prisma.product.delete({
        where: {
            id,
        },
    });
    return prod;
});
exports.deleteProductQuery = deleteProductQuery;
