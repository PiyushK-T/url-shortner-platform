import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  modulePathIgnorePatterns: ["<rootDir>/dist"],

  maxWorkers: 1,

  detectOpenHandles: true,
  forceExit: true,

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  moduleNameMapper: {
    "^axios$": "<rootDir>/tests/__mocks__/axios.ts",
    "^nanoid$": "<rootDir>/tests/__mocks__/nanoid.ts"
  }
};

export default config;
