"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
exports.getEnv = getEnv;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("4000"),
    AUTH_SERVICE_URL: zod_1.z.string(),
    URL_SERVICE_URL: zod_1.z.string(),
    ANALYTICS_SERVICE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: zod_1.z.string().optional(),
    BASE_URL: zod_1.z.string().default("http://localhost:3000"),
});
let cachedEnv = null;
function getEnv() {
    if (!cachedEnv) {
        cachedEnv = exports.envSchema.parse(process.env);
    }
    return cachedEnv;
}
