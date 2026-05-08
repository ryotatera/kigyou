"use client";

export type VideoEvent =
  | "video_play_started"
  | "video_25_percent"
  | "video_50_percent"
  | "video_paywall_shown"
  | "video_paywall_clicked"
  | "video_signup_converted"
  | "video_completed";

interface EventPayload {
  type: VideoEvent;
  videoId: string;
  currentSeconds?: number;
  ctaLabel?: string;
  sourcePage?: string;
}

export function track(event: EventPayload) {
  if (typeof window === "undefined") return;
  // §9.1 で定義された PostHog イベントを想定。プロトでは console + window 配列に積む。
  const w = window as unknown as { __sspEvents?: EventPayload[] };
  w.__sspEvents = w.__sspEvents ?? [];
  w.__sspEvents.push(event);
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[ssp:analytics]", event);
  }
}
