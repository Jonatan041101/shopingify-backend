"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const productlist_1 = require("../controller/productlist");
const router = (0, express_1.Router)();
exports.router = router;
router.put('/', productlist_1.updateProductList);
router.delete('/', productlist_1.deleteProductList);
