"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { STREAM_ERROR_MARKER } from "@/lib/config";

export type Message = { role: "user" | "assistant"; content: string };

type ChatWidgetDict = {
  firstMessage: string;
  errorMessage: string;
  interruptedMessage: string;
};

type ChatWidgetContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  messages: Message[];
  isSending: boolean;
  sendMessage: (content: string) => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

const SUMMARY_SENT_COUNT_KEY = "azeno-chat-summary-sent-count";
const MIN_USER_MESSAGES_FOR_SUMMARY = 2;

export function ChatWidgetProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: ChatWidgetDict;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<Message[]>(messages);
  const isSendingRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Sends a summary once the visitor leaves, regardless of which surface
  // (Demo section or the floating widget) the conversation happened in.
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState !== "hidden") return;

      const currentMessages = messagesRef.current;
      const userMessageCount = currentMessages.filter((message) => message.role === "user").length;
      if (userMessageCount < MIN_USER_MESSAGES_FOR_SUMMARY) return;

      const lastSentCount = Number(sessionStorage.getItem(SUMMARY_SENT_COUNT_KEY) ?? "0");
      if (currentMessages.length <= lastSentCount) return;

      sessionStorage.setItem(SUMMARY_SENT_COUNT_KEY, String(currentMessages.length));

      const payload = JSON.stringify({ lang: locale, messages: currentMessages });
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/chat/summary", blob);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [locale]);

  const open = useCallback(() => {
    setMessages((current) =>
      current.length === 0 ? [{ role: "assistant", content: dict.firstMessage }] : current,
    );
    setIsOpen(true);
  }, [dict.firstMessage]);

  const close = useCallback(() => setIsOpen(false), []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isSendingRef.current) return;

      isSendingRef.current = true;
      setIsSending(true);

      let nextMessages: Message[] = [];
      setMessages((current) => {
        const seeded = current.length === 0 ? [{ role: "assistant" as const, content: dict.firstMessage }] : current;
        nextMessages = [...seeded, { role: "user", content: trimmed }];
        return nextMessages;
      });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang: locale, messages: nextMessages }),
        });

        if (!response.ok || !response.body) {
          const errorText = await response.json().catch(() => null);
          setMessages((current) => [
            ...current,
            { role: "assistant", content: errorText?.error ?? dict.errorMessage },
          ]);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        setMessages((current) => [...current, { role: "assistant", content: "" }]);

        let assistantReply = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantReply += decoder.decode(value, { stream: true });

          const markerIndex = assistantReply.indexOf(STREAM_ERROR_MARKER);
          if (markerIndex !== -1) {
            const partial = assistantReply.slice(0, markerIndex);
            const trimmedPartial = partial.trim();
            const content =
              trimmedPartial.length > 0
                ? `${trimmedPartial}\n\n${dict.interruptedMessage}`
                : dict.interruptedMessage;
            setMessages((current) => [...current.slice(0, -1), { role: "assistant", content }]);
            break;
          }

          setMessages((current) => [
            ...current.slice(0, -1),
            { role: "assistant", content: assistantReply },
          ]);
        }
      } catch {
        setMessages((current) => [...current, { role: "assistant", content: dict.errorMessage }]);
      } finally {
        isSendingRef.current = false;
        setIsSending(false);
      }
    },
    [locale, dict.firstMessage, dict.errorMessage, dict.interruptedMessage],
  );

  return (
    <ChatWidgetContext.Provider value={{ isOpen, open, close, messages, isSending, sendMessage }}>
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const context = useContext(ChatWidgetContext);
  if (!context) throw new Error("useChatWidget must be used within a ChatWidgetProvider");
  return context;
}
