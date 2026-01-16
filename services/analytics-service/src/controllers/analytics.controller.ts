import { Request, Response } from "express";
import { AnalyticsEvent } from "../types/analytics";

export const trackEvent = (req: Request, res: Response) => {
  const event: AnalyticsEvent = req.body;

  if (!event.type || !event.timestamp) {
    return res.status(400).json({ error: "Invalid analytics event" });
  }

  // For now: just log (can be replaced with DB / Kafka later)
  console.log("Analytics event received:", event);

  return res.status(202).json({ status: "accepted" });
};
