"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const url_routes_1 = require("./modules/url/url.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// request logging
exports.app.use((req, _res, next) => {
    const requestId = req.headers["x-request-id"] ?? "unknown";
    const userEmail = req.headers["x-user-email"] ?? "anonymous";
    console.log(`[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`);
    next();
});
exports.app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
// 🔐 protect create URL
exports.app.use("/url", auth_middleware_1.requireUser, url_routes_1.urlRouter);
exports.app.use(error_middleware_1.errorHandler);
