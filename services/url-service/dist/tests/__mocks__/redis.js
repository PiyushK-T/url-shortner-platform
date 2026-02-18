"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
let store = {};
exports.createClient = jest.fn(() => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    exists: jest.fn(async (key) => (store[key] ? 1 : 0)),
    get: jest.fn(async (key) => store[key] ?? null),
    set: jest.fn(async (key, value) => {
        store[key] = value;
        return "OK";
    }),
    __resetStore: () => {
        store = {};
    },
}));
