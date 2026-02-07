import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  testPathIgnorePatterns: ["/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
  watchPathIgnorePatterns: ["/dist/"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  clearMocks: true
};

export default config;
