"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { env } from "../../config/env";
const env_1 = require("../../config/env");
const env = (0, env_1.getEnv)();
const users = new Map();
async function register(email, password) {
    if (users.has(email)) {
        throw new Error("User already exists");
    }
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    users.set(email, { email, passwordHash });
    return { email };
}
async function login(email, password) {
    const user = users.get(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const match = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!match) {
        throw new Error("Invalid credentials");
    }
    const secret = env.JWT_SECRET;
    const options = {
        expiresIn: env.JWT_EXPIRES_IN ? parseInt(env.JWT_EXPIRES_IN, 10) : "1h"
    };
    const token = jsonwebtoken_1.default.sign({ email }, secret, options);
    return { token };
}
