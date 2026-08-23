"use client";

import { useState, type KeyboardEvent } from "react";
import { useChatWidget } from "@/components/chat-context";

export function ChatEntryField({
  placeholder,
  suggestions,
  sendAriaLabel,
  className = "mt-8 w-full max-w-2xl",
}: {
  placeholder: string;
  suggestions: string[];
  sendAriaLabel: string;
  className?: string;
}) {
  const { submitMessage } = useChatWidget();
  const [value, setValue] = useState("");

  function submit(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;
    submitMessage(trimmed);
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
      <div className="flex items-center gap-2 rounded-lg border border-azeno-line bg-azeno-white py-1.5 pr-1.5 pl-4">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-azeno-ink outline-none placeholder:text-azeno-muted"
        />
        <button
          type="button"
          onClick={() => submit(value)}
          aria-label={sendAriaLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-azeno-blue transition-colors hover:bg-azeno-surface"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => submit(suggestion)}
            className="min-h-11 rounded-full border border-azeno-line px-4 text-sm text-azeno-ink transition-colors hover:border-azeno-blue hover:text-azeno-blue"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
