import { connectRedis } from "../src/config/redis";

beforeAll(async () => {
  await connectRedis();
});
