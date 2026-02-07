import request from "supertest";
import app from "../src/app";
import { getEnv } from "../src/config/env";

const env = getEnv();

afterEach(() => {
  jest.clearAllMocks();
});

describe("URL Service", () => {
  it("creates a short URL", async () => {
    const res = await request(app)
      .post("/url")
      .set("x-user-email", "user@test.com")
      .set("x-request-id", "test-request-id")
      .send({ longUrl: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBe(`${env.BASE_URL}/testcode`);
  });

  it("redirects to long URL", async () => {
    await request(app)
      .post("/url")
      .set("x-user-email", "user@test.com")
      .set("x-request-id", "test-request-id")
      .send({ longUrl: "https://example.com" });

    const res = await request(app)
      .get("/url/testcode")
      .set("x-user-email", "user@test.com")
      .set("x-request-id", "test-request-id");

    expect(res.status).toBe(302);
    expect(res.header.location).toBe("https://example.com");
  });
});
