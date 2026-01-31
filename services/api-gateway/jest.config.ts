import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "^uuid$": "<rootDir>/__mocks__/uuid.ts",
  },

  moduleFileExtensions: ["ts", "js", "json"],
};

export default config;
