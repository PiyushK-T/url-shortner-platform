import axios from "axios";
import { getEnv } from "../../config/env";
import {
  HEADER_REQUEST_ID,
  HEADER_USER_EMAIL,
} from "../constants/headers";

const env = getEnv();

export async function redirectUrl(req: Request, res: Response) {
  const { code } = req.params;

  const longUrl = await service.resolveUrl(code);
  if (!longUrl) {
    return res.status(404).send("Not found");
  }

  // Event data
  const event = {
    requestId: req.headers[HEADER_REQUEST_ID] as string,
    userEmail: req.headers[HEADER_USER_EMAIL] as string,
    code,
    timestamp: new Date().toISOString(),
    userAgent: req.headers["user-agent"],
    ip: req.ip
  };

  // Non-blocking analytics dispatch
  axios.post(`${env.ANALYTICS_SERVICE_URL}/track`, event).catch(() => {
    console.warn("Analytics post failed");
  });

  return res.redirect(longUrl);
}
