"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const store = new Map();
exports.createClient = jest.fn(() => ({
    isOpen: true,
    connect: jest.fn(),
    on: jest.fn(),
    exists: jest.fn(async (key) => (store.has(key) ? 1 : 0)),
    set: jest.fn(async (key, value) => {
        store.set(key, value);
    }),
    get: jest.fn(async (key) => store.get(key) ?? null)
}));
