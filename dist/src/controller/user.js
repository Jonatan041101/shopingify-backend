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
exports.createUser = exports.loginSesion = void 0;
const errors_1 = require("../util/errors");
const userQuery_1 = require("../query/userQuery");
const user_1 = require("../util/validates/user");
const loginSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogin = (0, user_1.validateLogin)(req);
    try {
        const user = yield (0, userQuery_1.loginSesionQuery)(userLogin);
        res.json({ user });
    }
    catch (error) {
        const ERROR = error;
        (0, errors_1.errorQuery)(res, ERROR);
    }
});
exports.loginSesion = loginSesion;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        const ERROR = error;
        (0, errors_1.errorQuery)(res, ERROR);
    }
});
exports.createUser = createUser;
