"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireUser = requireUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { env } from "../config/env";
const env_1 = require("../config/env");
const env = (0, env_1.getEnv)();
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Missing Authorization header" });
    }
    const token = authHeader.replace("Bearer ", "");
    const secret = env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret is not configured" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.userEmail = payload.email;
        next();
    }
    catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
function requireUser(req, res, next) {
    const userEmail = req.headers["x-user-email"];
    if (!userEmail || typeof userEmail !== "string") {
        return res.status(401).json({
            error: "Unauthorized: missing user identity"
        });
    }
    next();
}
