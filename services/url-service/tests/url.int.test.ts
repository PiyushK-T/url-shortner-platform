import request from "supertest";
import { app } from "../src/app";
import jwt from "jsonwebtoken";
import { env } from "../src/config/env";

// ----- MOCKS -----
jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "testcode") // deterministic short code
}));

jest.mock("axios", () => ({
  default: {
    post: jest.fn().mockResolvedValue({ status: 200 }) // no network call
  }
}));

// ----- TEST SETUP -----
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
      .send({ longUrl: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBe(`${env.BASE_URL}/testcode`);
  });

  it("redirects to long URL", async () => {
    // first, create a short URL
    await request(app)
      .post("/url")
      .set("Authorization", `Bearer ${token}`)
      .send({ longUrl: "https://example.com" });

    const res = await request(app).get("/url/testcode");
    expect(res.status).toBe(302);
    expect(res.header.location).toBe("https://example.com");
  });
});
