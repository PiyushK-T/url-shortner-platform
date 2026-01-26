"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const url_routes_1 = require("./modules/url/url.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
});
exports.app.use("/url", url_routes_1.urlRouter);
exports.app.use(error_middleware_1.errorHandler);
