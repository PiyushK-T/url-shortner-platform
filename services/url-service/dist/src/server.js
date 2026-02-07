"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const redis_1 = require("./config/redis");
const env_1 = require("./config/env");
const env = (0, env_1.getEnv)();
async function startServer() {
    await (0, redis_1.connectRedis)();
    app_1.default.listen(env.PORT, () => {
        console.log(`[URL Service] running on port ${env.PORT}`);
    });
}
startServer().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});
