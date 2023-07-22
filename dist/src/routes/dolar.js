"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const dolar_1 = require("../controller/dolar");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', dolar_1.getDolar);
