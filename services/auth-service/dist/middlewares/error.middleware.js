"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _, res, __) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
}
