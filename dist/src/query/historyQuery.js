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
exports.getAllCompleteHistory = exports.updateHistoryQuery = exports.searchHistoryPending = exports.getAllHistorys = exports.getProductsHistoryCreated = exports.createHistoryQuery = void 0;
const prisma_1 = require("../db/prisma");
const errors_1 = require("../util/errors");
const history_1 = require("../util/joinsQuerys/history");
const createHistoryQuery = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield prisma_1.prisma.history.create({
            data: {
                name,
                status: 'Pendiente',
            },
        });
        return history;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.createHistoryQuery = createHistoryQuery;
const getProductsHistoryCreated = (historyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getHistoryCreated = yield prisma_1.prisma.history.findFirst(Object.assign({ where: {
                id: historyId,
            } }, history_1.includeHistoryWithProductComplete));
        return getHistoryCreated;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.getProductsHistoryCreated = getProductsHistoryCreated;
const getAllHistorys = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historysWithProducts = yield prisma_1.prisma.history.findMany(Object.assign({}, history_1.includeHistoryWithProductComplete));
        return historysWithProducts;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.getAllHistorys = getAllHistorys;
const searchHistoryPending = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyPending = yield prisma_1.prisma.history.findFirst(Object.assign({ where: {
                status: 'Pendiente',
            } }, history_1.includeHistoryWithProductComplete));
        return historyPending;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.searchHistoryPending = searchHistoryPending;
const updateHistoryQuery = (historyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield prisma_1.prisma.history.update({
            where: {
                id: historyId,
            },
            data: {
                status,
            },
        });
        return history;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.updateHistoryQuery = updateHistoryQuery;
const getAllCompleteHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield prisma_1.prisma.history.findMany(Object.assign({ where: {
                status: 'Completado',
            } }, history_1.includeHistoryWithProductComplete));
        return history;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.getAllCompleteHistory = getAllCompleteHistory;
