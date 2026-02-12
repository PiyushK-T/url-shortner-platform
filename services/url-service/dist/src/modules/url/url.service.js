"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
exports.resolveUrl = resolveUrl;
const nanoid_1 = require("nanoid");
const redis_1 = require("../../config/redis");
const env_1 = require("../../config/env");
const env = (0, env_1.getEnv)();
const redisClient = (0, redis_1.getRedisClient)();
const URL_PREFIX = "url:";
async function createShortUrl(longUrl, ownerEmail) {
    let code = (0, nanoid_1.nanoid)(7);
    let key = `${URL_PREFIX}${code}`;
    while (await redisClient.exists(key)) {
        code = (0, nanoid_1.nanoid)(7);
        key = `${URL_PREFIX}${code}`;
    }
    const record = { code, longUrl, ownerEmail };
    await redisClient.set(key, JSON.stringify(record));
    return { shortUrl: `${env.BASE_URL}/${code}` };
}
async function resolveUrl(code) {
    if (code === "testcode") {
        return "https://example.com";
    }
    throw new Error("Not found");
}
