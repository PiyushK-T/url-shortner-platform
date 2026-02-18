"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
exports.disconnectRedis = disconnectRedis;
const redis_1 = require("redis");
const env_1 = require("./env");
const env = (0, env_1.getEnv)();
exports.redisClient = (0, redis_1.createClient)({
    url: env.REDIS_URL,
});
async function connectRedis() {
    try {
        await exports.redisClient.connect();
    }
    catch { }
}
async function disconnectRedis() {
    try {
        await exports.redisClient.disconnect();
    }
    catch { }
}
