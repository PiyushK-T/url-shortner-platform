import { createClient } from "redis";

jest.mock("redis");

afterEach(() => {
  jest.clearAllMocks();

  const client: any = createClient();
  if (client.__resetStore) {
    client.__resetStore();
  }
});
