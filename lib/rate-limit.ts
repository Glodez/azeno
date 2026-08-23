import type { NextRequest } from "next/server";

const WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 5 * 60_000;

const requestTimestamps = new Map<string, number[]>();
let lastCleanup = Date.now();

function cleanupStaleEntries(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, timestamps] of requestTimestamps) {
    const recent = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);
    if (recent.length === 0) {
      requestTimestamps.delete(ip);
    } else {
      requestTimestamps.set(ip, recent);
    }
  }
}

export function isRateLimited(ip: string, maxRequests: number): boolean {
  const now = Date.now();
  cleanupStaleEntries(now);

  const recent = (requestTimestamps.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestTimestamps.set(ip, recent);
  return recent.length > maxRequests;
}

/**
 * `x-real-ip` is set by the platform (Vercel) itself and can't be spoofed by
 * the client. `x-forwarded-for` is only a fallback, and only its first entry
 * is used — everything after that can be appended by the client.
 */
export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return "unknown";
}
