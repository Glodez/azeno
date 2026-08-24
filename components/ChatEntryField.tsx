"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useChatWidget } from "@/components/chat-context";
import { ChatTranscript } from "@/components/ChatTranscript";

export function ChatEntryField({
  placeholder,
  suggestions,
  sendAriaLabel,
  privacyText,
  privacyLinkLabel,
  privacyHref,
  className = "mt-8 w-full max-w-2xl",
}: {
  placeholder: string;
  suggestions: string[];
  sendAriaLabel: string;
  privacyText: string;
  privacyLinkLabel: string;
  privacyHref: string;
  className?: string;
}) {
  const { messages, isSending, sendMessage } = useChatWidget();
  const [value, setValue] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const hasConversation = messages.length > 0;

  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function submit(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;
    sendMessage(trimmed);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(value);
    }
  }

  return (
    <div className={className}>
      {hasConversation && (
        <div
          ref={transcriptRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          className="mb-3 max-h-96 space-y-3 overflow-y-auto rounded-lg border border-azeno-line bg-azeno-white p-4"
        >
          <ChatTranscript messages={messages} />
        </div>
      )}

      <div className={`rounded-lg ${hasConversation ? "" : "azeno-glow-border"}`}>
        <div className="flex items-center gap-3 rounded-lg border border-azeno-line bg-azeno-white py-1.5 pr-1.5 pl-4 transition-all duration-200 focus-within:border-azeno-blue focus-within:ring-2 focus-within:ring-azeno-blue/15">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azeno-cyan opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-azeno-cyan" />
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-azeno-ink outline-none placeholder:text-azeno-muted"
          />
          <button
            type="button"
            onClick={() => submit(value)}
            disabled={isSending || value.trim().length === 0}
            aria-label={sendAriaLabel}
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-azeno-blue transition-all duration-200 ease-out hover:bg-azeno-blue hover:text-azeno-white motion-safe:hover:scale-105 motion-safe:active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {hasConversation ? (
        <p className="mt-3 text-xs text-azeno-muted">
          {privacyText}{" "}
          <Link href={privacyHref} className="text-azeno-blue hover:underline">
            {privacyLinkLabel}
          </Link>
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => submit(suggestion)}
              className="min-h-11 rounded-full border border-azeno-line px-4 text-left text-sm text-azeno-ink transition-all duration-200 ease-out hover:border-azeno-blue hover:text-azeno-blue hover:shadow-md hover:shadow-azeno-blue/15 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
