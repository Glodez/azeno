import type { NextRequest } from "next/server";
import { openai } from "@/lib/openai";
import { getSystemPrompt } from "@/lib/system-prompt";
import { hasLocale, defaultLocale, type Locale } from "@/lib/i18n";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 15;

const ERROR_MESSAGES: Record<Locale, string> = {
  sl: "Trenutno ne morem odgovoriti, poskusite čez trenutek ali rezervirajte termin.",
  en: "I can't respond right now, please try again shortly or book a consultation.",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

const requestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestTimestamps.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidMessage(message: unknown): message is ChatMessage {
  if (typeof message !== "object" || message === null) return false;
  const { role, content } = message as Record<string, unknown>;
  return (
    (role === "user" || role === "assistant") &&
    typeof content === "string" &&
    content.length > 0 &&
    content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: NextRequest) {
  let body: { lang?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ERROR_MESSAGES[defaultLocale] }, { status: 400 });
  }

  const locale = typeof body.lang === "string" && hasLocale(body.lang) ? body.lang : defaultLocale;

  if (isRateLimited(getClientIp(request))) {
    return Response.json({ error: ERROR_MESSAGES[locale] }, { status: 429 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || !body.messages.every(isValidMessage)) {
    return Response.json({ error: ERROR_MESSAGES[locale] }, { status: 400 });
  }

  const history = (body.messages as ChatMessage[]).slice(-MAX_HISTORY_MESSAGES);

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      stream: true,
      prompt_cache_key: `azeno-system-${locale}`,
      messages: [{ role: "system", content: getSystemPrompt(locale) }, ...history],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch {
          // Stream already started to the client — a JSON error can no longer be sent.
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return Response.json({ error: ERROR_MESSAGES[locale] }, { status: 502 });
  }
}
