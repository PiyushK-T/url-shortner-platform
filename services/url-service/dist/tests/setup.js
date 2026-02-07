"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../src/config/redis");
beforeAll(async () => {
    await (0, redis_1.connectRedis)();
});
