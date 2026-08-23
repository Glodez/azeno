import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { hasLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 50;
const RATE_LIMIT_MAX_REQUESTS = 10;

type ChatMessage = { role: "user" | "assistant"; content: string };

function pluralizeSporocila(count: number): string {
  if (count === 1) return "sporočilo";
  if (count === 2) return "sporočili";
  if (count === 3 || count === 4) return "sporočila";
  return "sporočil";
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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(getClientIp(request), RATE_LIMIT_MAX_REQUESTS)) {
      return new Response(null, { status: 429 });
    }

    const body = await request.json();
    const locale: Locale = typeof body?.lang === "string" && hasLocale(body.lang) ? body.lang : defaultLocale;

    if (!Array.isArray(body?.messages)) {
      return new Response(null, { status: 400 });
    }

    const messages = (body.messages as unknown[]).slice(0, MAX_MESSAGES).filter(isValidMessage) as ChatMessage[];

    if (messages.length === 0) {
      return new Response(null, { status: 400 });
    }

    const timestamp = new Date()
      .toLocaleString("sl-SI", {
        timeZone: "Europe/Ljubljana",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/,\s*/, " ");

    const transcript = messages
      .map((message) => `${message.role === "user" ? "Obiskovalec" : "Bot"}: ${message.content}`)
      .join("\n\n");

    const text = [`Jezik strani: ${locale.toUpperCase()}`, `Število sporočil: ${messages.length}`, "", transcript].join(
      "\n"
    );

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "azenoai.si@gmail.com",
      subject: `AZENO chat — ${timestamp} — ${messages.length} ${pluralizeSporocila(messages.length)}`,
      text,
    });

    if (error) {
      console.error("Failed to send chat summary email:", error);
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to send chat summary email:", error);
    return new Response(null, { status: 200 });
  }
}
