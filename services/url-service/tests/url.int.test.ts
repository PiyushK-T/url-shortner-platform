import * as urlService from "../src/modules/url/url.service";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../src/app";
import { getEnv } from "../src/config/env";

// ----- ENV -----
const env = getEnv();

let server: any;

// ----- SETUP / TEARDOWN -----
beforeAll((done) => {
  server = app.listen(() => {
    done();
  });
});
afterAll((done) => {
  server.close(done());
});

//----- TOKEN -----
const token = jwt.sign(
  { email: "user@test.com" },
  env.JWT_SECRET as string,
  { expiresIn: "1h" }
);

afterEach(() => {
  jest.clearAllMocks();
});

// ----- MOCKS -----
jest.mock("axios", () => ({
  default: {
    post: jest.fn().mockResolvedValue({ status: 200 })
  }
}));

afterEach(() => {
  jest.clearAllMocks();
  urlService.__clearUrlsForTests();
});

describe("URL Service", () => {
  it("creates a short URL", async () => {
    const res = await request(server)
      .post("/url")
      .set("x-user-email", "user@test.com")
      .set("x-request-id", "test-request-id")
      .send({ longUrl: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBe(
      `${env.BASE_URL}/testcode`
    );
  });

  it("redirects to long URL", async () => {
    // create URL
    await request(server)
      .post("/url")
      .set("x-user-email", "user@test.com")
      .set("x-request-id", "test-request-id")
      .send({ longUrl: "https://example.com" });

  // redirect
const res = await request(server)
  .get("/url/testcode")
  .set("x-request-id", "test-request-id")
  .set("x-user-email", "user@test.com");   

expect(res.status).toBe(302);
expect(res.header.location).toBe("https://example.com");

  });
});
