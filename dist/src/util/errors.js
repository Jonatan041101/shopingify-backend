"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFunction = exports.errorQuery = exports.MSG_BAD_LOGIN = void 0;
exports.MSG_BAD_LOGIN = 'La contraseña o usuario es incorrecto';
const errorQuery = (res, error) => {
    const ERROR = error;
    res.status(500).json({ message: ERROR.message });
};
exports.errorQuery = errorQuery;
const errorFunction = (error) => {
    const ERROR = error;
    throw new Error(ERROR.message);
};
exports.errorFunction = errorFunction;
