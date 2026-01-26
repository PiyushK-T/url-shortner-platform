"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
exports.resolveUrl = resolveUrl;
const nanoid_1 = require("nanoid");
const axios_1 = __importDefault(require("axios"));
// import { env } from "../../config/env";
const env_1 = require("../../config/env");
const env = (0, env_1.getEnv)();
const urls = new Map();
function createShortUrl(longUrl, ownerEmail) {
    let code = (0, nanoid_1.nanoid)(7);
    while (urls.has(code)) {
        code = (0, nanoid_1.nanoid)(7);
    }
    const record = { code, longUrl, ownerEmail };
    urls.set(code, record);
    return {
        shortUrl: `${env.BASE_URL}/${code}`
    };
}
async function resolveUrl(code) {
    const record = urls.get(code);
    if (!record) {
        throw new Error("URL not found");
    }
    // fire-and-forget analytics
    axios_1.default.post(`${env.ANALYTICS_SERVICE_URL}/events`, {
        code,
        timestamp: new Date().toISOString()
    }).catch(() => { });
    return record.longUrl;
}
