"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_routes_1 = require("./modules/url/url.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
const redis_1 = require("./config/redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
/**
 * Connect Redis
 */
if (process.env.NODE_ENV !== "test") {
    (0, redis_1.connectRedis)().catch((err) => {
        console.error("Failed to connect Redis", err);
        process.exit(1);
    });
}
/**
 * Request logging
 */
app.use((req, _res, next) => {
    const requestId = req.headers["x-request-id"] ?? "unknown";
    const userEmail = req.headers["x-user-email"] ?? "anonymous";
    // console.log(
    //   `[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`
    // );
    next();
});
/**
 * Health check
 */
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
/**
 * Routes
 * - POST /url (protected)
 * - GET /url/:code (public redirect)
 */
app.use("/url", auth_middleware_1.requireUser, url_routes_1.urlRouter);
/**
 * Global error handler
 */
app.use(error_middleware_1.errorHandler);
exports.default = app;
