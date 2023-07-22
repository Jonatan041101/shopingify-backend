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
exports.getDolarQuery = void 0;
const prisma_1 = require("../db/prisma");
const errors_1 = require("../util/errors");
const getDolarQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dolar = yield prisma_1.prisma.dolar.findFirst({
            where: {
                id: '5258b240-54a8-4166-9e97-a7bb051e93b0',
            },
        });
        return dolar;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.getDolarQuery = getDolarQuery;
