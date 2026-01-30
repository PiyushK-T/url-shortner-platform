"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rateLimit_middleware_1 = require("./middleware/rateLimit.middleware");
const routes_1 = require("./routes");
const error_middleware_1 = require("./middleware/error.middleware");
const requestId_middleware_1 = require("./middleware/requestId.middleware");
const auth_1 = require("./middleware/auth");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(rateLimit_middleware_1.rateLimiter);
exports.app.use(requestId_middleware_1.requestIdMiddleware);
exports.app.use(auth_1.authMiddleware);
exports.app.use((req, res, next) => {
    const requestId = req.headers["x-request-id"];
    console.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
    next();
});
exports.app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
});
exports.app.use(routes_1.proxyRouter);
exports.app.use(error_middleware_1.errorHandler);
