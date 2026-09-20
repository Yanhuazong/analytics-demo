import { sendGAEvent } from "@next/third-parties/google";

/**
 * GA4 Measurement ID. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
 * (copy .env.example) — see README.md. Falls back to a harmless placeholder
 * so the app still builds and runs without one configured.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

/**
 * Fires a GA4 event through @next/third-parties' sendGAEvent (the
 * module-based approach, vs. calling a hand-pasted window.gtag directly).
 * sendGAEvent just pushes onto window.dataLayer, so it's safe to call even
 * before the GA script has finished loading — the queued event is picked
 * up once it does. Also logs to the console so it's easy to pair "what the
 * code just did" with what shows up in GA4 Realtime/DebugView.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  sendGAEvent("event", eventName, params);
  console.log(`%c[GA4 event] ${eventName}`, "color:#4f46e5;font-weight:bold;", params);
}

/**
 * Sets GA4's User-ID field so every subsequent hit in this session is
 * attributed to this (pseudonymous, non-PII) ID. See src/lib/auth.ts and
 * src/components/AuthUserIdSync.tsx for where this gets called.
 */
export function setGaUserId(userId: string) {
  sendGAEvent("set", { user_id: userId });
  console.log("%c[GA4 set] user_id", "color:#14b8a6;font-weight:bold;", userId);
}
