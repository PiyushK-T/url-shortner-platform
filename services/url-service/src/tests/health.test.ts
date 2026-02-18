import request from "supertest";
import app from "../app";
import {
  HEADER_REQUEST_ID,
  HEADER_USER_EMAIL,
} from "../constants/headers";

describe("Health Check", () => {
  it("returns ok", async () => {
    const res = await request(app)
      .get("/health")
      .set(HEADER_REQUEST_ID, "test-request-id")
      .set(HEADER_USER_EMAIL, "test@example.com");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
