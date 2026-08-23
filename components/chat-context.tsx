"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ChatWidgetContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  registerOnOpen: (handler: () => void) => void;
  submitMessage: (content: string) => void;
  registerOnSubmit: (handler: (content: string) => void) => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenRef = useRef<() => void>(() => {});
  const onSubmitRef = useRef<(content: string) => void>(() => {});

  const registerOnOpen = useCallback((handler: () => void) => {
    onOpenRef.current = handler;
  }, []);

  const registerOnSubmit = useCallback((handler: (content: string) => void) => {
    onSubmitRef.current = handler;
  }, []);

  const open = useCallback(() => {
    onOpenRef.current();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const submitMessage = useCallback((content: string) => {
    setIsOpen(true);
    onSubmitRef.current(content);
  }, []);

  return (
    <ChatWidgetContext.Provider
      value={{ isOpen, open, close, registerOnOpen, submitMessage, registerOnSubmit }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const context = useContext(ChatWidgetContext);
  if (!context) throw new Error("useChatWidget must be used within a ChatWidgetProvider");
  return context;
}
