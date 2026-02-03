// services/url-service/tests/url.int.test.ts

import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../src/app";
import { getEnv } from "../src/config/env";
import {
  HEADER_REQUEST_ID,
  HEADER_USER_EMAIL,
} from "../src/constants/headers";

// ----- ENV -----
const env = getEnv();

// ----- MOCKS -----
jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "testcode"),
}));

jest.mock("axios", () => ({
  default: {
    post: jest.fn().mockResolvedValue({ status: 200 }),
  },
}));

// ----- AUTH TOKEN -----
const token = jwt.sign(
  { email: "user@test.com" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

afterEach(() => {
  jest.clearAllMocks();
});

describe("URL Service", () => {
  it("creates a short URL", async () => {
    const res = await request(app)
      .post("/url")
      .set("Authorization", `Bearer ${token}`)
      .set(HEADER_REQUEST_ID, "test-request-id")
      .set(HEADER_USER_EMAIL, "user@test.com")
      .send({ longUrl: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBe(`${env.BASE_URL}/testcode`);
  });

  it("redirects to long URL", async () => {
    await request(app)
      .post("/url")
      .set("Authorization", `Bearer ${token}`)
      .set(HEADER_REQUEST_ID, "test-request-id")
      .set(HEADER_USER_EMAIL, "user@test.com")
      .send({ longUrl: "https://example.com" });

    const res = await request(app)
      .get("/url/testcode")
      .set(HEADER_REQUEST_ID, "test-request-id")
      .set(HEADER_USER_EMAIL, "user@test.com");

    expect(res.status).toBe(302);
    expect(res.header.location).toBe("https://example.com");
  });
});
