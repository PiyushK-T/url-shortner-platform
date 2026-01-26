"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEvent = void 0;
const trackEvent = (req, res) => {
    const event = req.body;
    if (!event.type || !event.timestamp) {
        return res.status(400).json({ error: "Invalid analytics event" });
    }
    // For now: just log (can be replaced with DB / Kafka later)
    console.log("Analytics event received:", event);
    return res.status(202).json({ status: "accepted" });
};
exports.trackEvent = trackEvent;
