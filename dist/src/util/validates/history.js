"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStatus = exports.validateString = exports.errorStatus = exports.errorName = void 0;
const client_1 = require("@prisma/client");
const errorName = (name) => `El nombre ${name} no es un string`;
exports.errorName = errorName;
const errorStatus = (status) => `El nombre ${status} no es un Status 'Pendiente'|'Completado'|'Cancelado'`;
exports.errorStatus = errorStatus;
const validateString = (name) => {
    if (typeof name !== 'string')
        throw new Error((0, exports.errorName)(name));
    return name;
};
exports.validateString = validateString;
const validateStatus = (stats) => {
    const stat = (0, exports.validateString)(stats);
    if (!stat)
        throw new Error((0, exports.errorName)(stats));
    if (!Object.values(client_1.Status).includes(stats))
        throw new Error((0, exports.errorStatus)(stats));
};
exports.validateStatus = validateStatus;
