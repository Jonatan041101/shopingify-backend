"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const validateLogin = (req) => {
    const { user, password } = req.body;
    if (typeof user !== 'string' || typeof password !== 'string') {
        throw new Error('Todos los datos tiene que ser de tipo string.');
    }
    if (user.trim().length === 0 || password.trim().length === 0) {
        throw new Error('Completa todos los campos.');
    }
    return {
        user,
        password,
    };
};
exports.validateLogin = validateLogin;
