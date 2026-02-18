"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
jest.mock("redis");
afterEach(() => {
    jest.clearAllMocks();
    const client = (0, redis_1.createClient)();
    if (client.__resetStore) {
        client.__resetStore();
    }
});
