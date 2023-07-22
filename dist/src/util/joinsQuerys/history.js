"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeHistoryWithProductComplete = void 0;
exports.includeHistoryWithProductComplete = {
    include: {
        product: {
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
        },
    },
};
