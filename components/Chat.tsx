"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useChatWidget } from "@/components/chat-context";
import { ChatTranscript } from "@/components/ChatTranscript";
import { CAL_URL, getCalTriggerProps } from "@/lib/config";

type ChatDict = {
  windowTitle: string;
  bubbleGreeting: string;
  bubbleClose: string;
  placeholder: string;
  send: string;
  openLabel: string;
  closeLabel: string;
  privacyText: string;
  privacyLinkLabel: string;
  bookButton: string;
};

const INVITE_DISMISSED_KEY = "azeno-chat-invite-dismissed";
const INVITE_DELAY_MS = 20_000;
const MAX_MESSAGE_LENGTH = 2000;

export function Chat({
  locale,
  dict,
  privacyHref,
}: {
  locale: Locale;
  dict: ChatDict;
  privacyHref: string;
}) {
  const { isOpen, open, close, messages, isSending, sendMessage } = useChatWidget();
  const [showInvite, setShowInvite] = useState(false);
  const [input, setInput] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(INVITE_DISMISSED_KEY)) return;
    const timer = setTimeout(() => setShowInvite(true), INVITE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      panelRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  function dismissInvite() {
    setShowInvite(false);
    sessionStorage.setItem(INVITE_DISMISSED_KEY, "1");
  }

  function openChat() {
    dismissInvite();
    open();
  }

  function submit(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;
    sendMessage(trimmed);
    setInput("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={dict.windowTitle}
          tabIndex={-1}
          className="flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-lg border border-azeno-line bg-azeno-white outline-none"
        >
          <div className="flex items-center justify-between border-b border-azeno-line px-4 py-3">
            <p className="font-semibold text-azeno-navy">{dict.windowTitle}</p>
            <button
              type="button"
              onClick={close}
              aria-label={dict.closeLabel}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-azeno-muted transition-colors hover:text-azeno-ink"
            >
              ✕
            </button>
          </div>

          <div
            ref={transcriptRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            <ChatTranscript messages={messages} />
          </div>

          <div className="border-t border-azeno-line p-3">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              {...getCalTriggerProps(locale)}
              className="flex min-h-11 w-full items-center justify-center rounded-md bg-azeno-blue px-4 text-sm font-semibold text-azeno-white transition-all duration-200 ease-out hover:bg-azeno-navy hover:shadow-lg hover:shadow-azeno-blue/25 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]"
            >
              {dict.bookButton}
            </a>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-azeno-line p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder={dict.placeholder}
              aria-label={dict.placeholder}
              className="min-h-11 flex-1 rounded-md border border-azeno-line px-3 text-sm text-azeno-ink outline-none focus:border-azeno-blue"
            />
            <button
              type="submit"
              disabled={isSending || input.trim().length === 0}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-azeno-blue px-4 text-sm font-semibold text-azeno-white transition-all duration-200 ease-out hover:bg-azeno-navy hover:shadow-lg hover:shadow-azeno-blue/25 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {dict.send}
            </button>
          </form>

          <p className="border-t border-azeno-line px-4 py-2 text-xs text-azeno-muted">
            {dict.privacyText}{" "}
            <Link href={privacyHref} className="text-azeno-blue hover:underline">
              {dict.privacyLinkLabel}
            </Link>
          </p>
        </div>
      )}

      {!isOpen && showInvite && (
        <div className="flex max-w-xs items-start gap-1 rounded-lg border border-azeno-line bg-azeno-white py-1 pr-1 pl-4">
          <button
            type="button"
            onClick={openChat}
            className="min-h-11 py-3 text-left text-sm text-azeno-ink hover:underline"
          >
            {dict.bubbleGreeting}
          </button>
          <button
            type="button"
            onClick={dismissInvite}
            aria-label={dict.bubbleClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-azeno-muted transition-colors hover:text-azeno-ink"
          >
            ✕
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => (isOpen ? close() : openChat())}
        aria-label={isOpen ? dict.closeLabel : dict.openLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-azeno-blue text-azeno-white transition-all duration-200 ease-out hover:bg-azeno-navy hover:shadow-lg hover:shadow-azeno-blue/30 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-105 motion-safe:active:scale-95"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 4.418-4.03 8-9 8-1.09 0-2.135-.174-3.1-.494L3 20l1.607-3.214C3.596 15.542 3 13.836 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
