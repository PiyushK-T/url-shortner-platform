"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
exports.getEnv = getEnv;
const zod_1 = require("zod");
// dotenv.config();
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("4000"),
    AUTH_SERVICE_URL: zod_1.z.string().optional(),
    URL_SERVICE_URL: zod_1.z.string().optional(),
    ANALYTICS_SERVICE_URL: zod_1.z.string().optional(),
    JWT_SECRET: zod_1.z.string().optional(),
    BASE_URL: zod_1.z.string().default("http://localhost:3000"),
    JWT_EXPIRES_IN: zod_1.z.string().min(1).default("1h"),
});
let cachedEnv = null;
function getEnv() {
    if (!cachedEnv) {
        cachedEnv = exports.envSchema.parse(process.env);
    }
    return cachedEnv;
}
