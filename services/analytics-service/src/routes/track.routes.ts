import { Router, Request, Response } from "express";

export const trackRouter = Router();

// simple in-memory store
const events: any[] = [];

trackRouter.post("/track", (req: Request, res: Response) => {
  const event = req.body;

  // Basic validation
  if (!event.code || !event.timestamp) {
    return res.status(400).json({ message: "Invalid event" });
  }

  events.push(event);
  return res.status(202).json({ status: "accepted" });
});

// Optionally expose stored events
trackRouter.get("/events", (_req: Request, res: Response) => {
  res.json(events);
});
