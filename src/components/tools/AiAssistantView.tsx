"use client";

import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { INITIAL_MESSAGES, getCannedReply, type ChatMessage } from "@/lib/tools-data";

function nowLabel() {
  return new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `local-${idCounter}`;
}

export default function AiAssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isThinking) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: text,
      timestamp: nowLabel(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    const reply = getCannedReply(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: reply,
          timestamp: nowLabel(),
        },
      ]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <div>
      <PageHeader
        icon="🤖"
        title="AI Assistant"
        description="An assistant for drafting proposals, summarizing meetings, and research."
      />

      <Card className="flex h-[32rem] flex-col p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm shadow-sm ${
                  message.role === "user"
                    ? "bg-brand-blue text-white"
                    : "border border-border bg-surface-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div
                  className={`mt-1.5 text-[10px] ${
                    message.role === "user" ? "text-white/70" : "text-status-neutral"
                  }`}
                >
                  {message.role === "user" ? "You" : "Assistant"} · {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm text-status-neutral shadow-sm">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-status-neutral [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-status-neutral [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-status-neutral" />
                </span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant to draft, summarize, or research something…"
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="shrink-0 rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </Card>

      <p className="mt-4 text-xs text-status-neutral">
        This is a simulated assistant for demonstration purposes — responses are generated locally and no data leaves the browser.
      </p>
    </div>
  );
}
