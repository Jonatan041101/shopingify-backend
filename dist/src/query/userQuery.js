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
exports.loginSesionQuery = exports.passwordConfirm = exports.searchUser = void 0;
const prisma_1 = require("../db/prisma");
const errors_1 = require("../util/errors");
const searchUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                user: userName,
            },
        });
        if (!user)
            throw new Error(errors_1.MSG_BAD_LOGIN);
        return user;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.searchUser = searchUser;
const passwordConfirm = (password, receivedPassword) => {
    if (password === receivedPassword)
        return;
    throw new Error(errors_1.MSG_BAD_LOGIN);
};
exports.passwordConfirm = passwordConfirm;
const loginSesionQuery = (userLogin) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, exports.searchUser)(userLogin.user);
        (0, exports.passwordConfirm)((_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : '', userLogin.password);
        return user;
    }
    catch (error) {
        (0, errors_1.errorFunction)(error);
    }
});
exports.loginSesionQuery = loginSesionQuery;
