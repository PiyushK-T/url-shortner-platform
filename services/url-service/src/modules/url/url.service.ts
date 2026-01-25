import { nanoid } from "nanoid";
import axios from "axios";
// import { env } from "../../config/env";
import { getEnv } from "../config/env";
const env = getEnv();

type UrlRecord = {
  code: string;
  longUrl: string;
  ownerEmail: string;
};

const urls = new Map<string, UrlRecord>();

export function createShortUrl(longUrl: string, ownerEmail: string) {
  let code = nanoid(7);

  while (urls.has(code)) {
    code = nanoid(7);
  }

  const record: UrlRecord = { code, longUrl, ownerEmail };
  urls.set(code, record);

  return {
    shortUrl: `${env.BASE_URL}/${code}`
  };
}

export async function resolveUrl(code: string) {
  const record = urls.get(code);
  if (!record) {
    throw new Error("URL not found");
  }

  // fire-and-forget analytics
  axios.post(`${env.ANALYTICS_SERVICE_URL}/events`, {
    code,
    timestamp: new Date().toISOString()
  }).catch(() => {});

  return record.longUrl;
}
