"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const env_1 = require("./env");
const env = (0, env_1.getEnv)();
exports.redisClient = (0, redis_1.createClient)({
    url: env.REDIS_URL
});
exports.redisClient.on("error", (err) => {
    console.error("[Redis] Error", err);
});
async function connectRedis() {
    if (!exports.redisClient.isOpen) {
        await exports.redisClient.connect();
        console.log("[Redis] Connected");
    }
}
