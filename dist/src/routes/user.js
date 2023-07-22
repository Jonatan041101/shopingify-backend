"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/login', user_1.loginSesion);
