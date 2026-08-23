import type { NextRequest } from "next/server";
import { openai } from "@/lib/openai";
import { getSystemPrompt } from "@/lib/system-prompt";
import { hasLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";
import { STREAM_ERROR_MARKER } from "@/lib/config";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 10;
const RATE_LIMIT_MAX_REQUESTS = 15;

const ERROR_MESSAGES: Record<Locale, string> = {
  sl: "Trenutno ne morem odgovoriti, poskusite čez trenutek ali rezervirajte termin.",
  en: "I can't respond right now, please try again shortly or book a consultation.",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

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

  if (isRateLimited(getClientIp(request), RATE_LIMIT_MAX_REQUESTS)) {
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
          // Stream already started to the client — a JSON error can no longer be
          // sent, so append a marker the client can detect and show as an
          // interrupted-answer notice instead.
          controller.enqueue(encoder.encode(STREAM_ERROR_MARKER));
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
