"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = getRedisClient;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const env_1 = require("./env");
const env = (0, env_1.getEnv)();
let redisClient = null;
function getRedisClient() {
    if (process.env.NODE_ENV === "test") {
        return {
            exists: async () => 0,
            set: async () => { },
            get: async () => null,
            quit: async () => { }
        };
    }
    if (!redisClient) {
        redisClient = (0, redis_1.createClient)({
            url: env.REDIS_URL
        });
    }
    return redisClient;
}
async function connectRedis() {
    if (process.env.NODE_ENV === "test")
        return;
    const client = getRedisClient();
    await client.connect();
    console.log("Redis connected");
}
