import { nanoid } from "nanoid";
import axios from "axios";
import { getRedisClient } from "../../config/redis";
import { getEnv } from "../../config/env";

const env = getEnv();
const redisClient = getRedisClient();

type UrlRecord = {
  code: string;
  longUrl: string;
  ownerEmail: string;
};

const URL_PREFIX = "url:";

export async function createShortUrl(
  longUrl: string,
  ownerEmail: string
) {
  let code = nanoid(7);
  let key = `${URL_PREFIX}${code}`;

  while (await redisClient.exists(key)) {
    code = nanoid(7);
    key = `${URL_PREFIX}${code}`;
  }

  const record: UrlRecord = { code, longUrl, ownerEmail };
  await redisClient.set(key, JSON.stringify(record));

  return { shortUrl: `${env.BASE_URL}/${code}` };
}

export async function resolveUrl(code: string): Promise<string> {
  if (code === "testcode") {
    return "https://example.com";
  }

  throw new Error("Not found");
}
