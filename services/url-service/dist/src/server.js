"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const redis_1 = require("./config/redis");
const PORT = process.env.PORT || 3000;
async function start() {
    await (0, redis_1.connectRedis)();
    app_1.default.listen(PORT, () => {
        console.log(`URL Service running on port ${PORT}`);
    });
}
start();
