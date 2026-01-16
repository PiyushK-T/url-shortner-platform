export interface AnalyticsEvent {
  type: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}
