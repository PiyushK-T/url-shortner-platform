"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const env = (0, env_1.getEnv)();
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Missing token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // const payload = jwt.verify(token, env.JWT_SECRET) as unknown as { email: string };
        if (!env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const payload = jsonwebtoken_1.default.verify(token, env.JWT_SECRET);
        // Attach to headers for downstream services
        req.headers["x-user-email"] = payload.email;
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}
