import type { Message } from "@/components/chat-context";

export function ChatTranscript({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
            message.role === "user"
              ? "ml-auto bg-azeno-blue text-azeno-white"
              : "bg-azeno-surface text-azeno-ink"
          }`}
        >
          {message.content}
        </div>
      ))}
    </>
  );
}
