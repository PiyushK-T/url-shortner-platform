import request from "supertest";
import { app } from "../src/app";

describe("Auth Service", () => {
  it("registers a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com", password: "password123" });

    expect(res.status).toBe(201);
  });

  it("logs in a user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
