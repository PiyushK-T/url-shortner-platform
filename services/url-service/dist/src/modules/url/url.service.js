"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
exports.resolveUrl = resolveUrl;
const nanoid_1 = require("nanoid");
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../../config/redis");
const env_1 = require("../../config/env");
const env = (0, env_1.getEnv)();
const URL_PREFIX = "url:";
async function createShortUrl(longUrl, ownerEmail) {
    let code = (0, nanoid_1.nanoid)(7);
    let key = `${URL_PREFIX}${code}`;
    while (await redis_1.redisClient.exists(key)) {
        code = (0, nanoid_1.nanoid)(7);
        key = `${URL_PREFIX}${code}`;
    }
    const record = { code, longUrl, ownerEmail };
    await redis_1.redisClient.set(key, JSON.stringify(record));
    return { shortUrl: `${env.BASE_URL}/${code}` };
}
async function resolveUrl(code) {
    const key = `${URL_PREFIX}${code}`;
    const raw = await redis_1.redisClient.get(key);
    if (!raw) {
        throw new Error("URL not found");
    }
    const record = JSON.parse(raw);
    axios_1.default
        .post(`${env.ANALYTICS_SERVICE_URL}/events`, {
        code,
        timestamp: new Date().toISOString()
    })
        .catch(() => { });
    return record.longUrl;
}
