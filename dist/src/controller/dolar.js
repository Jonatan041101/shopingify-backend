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
exports.getDolar = void 0;
const errors_1 = require("../util/errors");
const dolarQuery_1 = require("../query/dolarQuery");
const getDolar = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dolar = yield (0, dolarQuery_1.getDolarQuery)();
        return res.json({ dolar });
    }
    catch (error) {
        (0, errors_1.errorQuery)(res, error);
    }
});
exports.getDolar = getDolar;
