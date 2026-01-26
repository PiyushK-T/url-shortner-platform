"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const env_1 = require("./config/env");
const { PORT, JWT_SECRET, JWT_EXPIRES_IN } = (0, env_1.getEnv)();
const port = PORT ? Number(PORT) : 4001;
app_1.app.listen(port, () => {
    console.log(`Auth service running on port ${port}`);
});
