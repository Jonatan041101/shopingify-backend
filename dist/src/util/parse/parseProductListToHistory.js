"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProductsHistory = void 0;
const parseProductsHistory = (productsList, historyId) => {
    return productsList.map(({ count, productId }) => ({
        count,
        productId,
        historyId,
    }));
};
exports.parseProductsHistory = parseProductsHistory;
