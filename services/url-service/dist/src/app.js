"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_routes_1 = require("./modules/url/url.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// request logging
app.use((req, _res, next) => {
    const requestId = req.headers["x-request-id"] ?? "unknown";
    const userEmail = req.headers["x-user-email"] ?? "anonymous";
    console.log(`[URL Service] [${requestId}] user=${userEmail} ${req.method} ${req.path}`);
    next();
});
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
// protected create + public redirect
app.use("/url", auth_middleware_1.requireUser, url_routes_1.urlRouter);
app.use(error_middleware_1.errorHandler);
exports.default = app;
