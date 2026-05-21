import { useState } from "react";
import { send_request } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ step: "idle" });
  const [result, setResult] = useState(null);
  const [chatLoading, setLoading] = useState(false);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { text, type: "USER" }, { text: "", type: "AI" }]);
    setLoading(true);

    send_request(text, {
      onChunk: (chunkText) => {
        setLoading(false);
        setMessages((prev) => {
          const update = [...prev];
          if (update[update.length - 1]?.type === "SERVER_STATUS")
            update.pop();
          const last = update[update.length - 1];
          if (last && last.type === "AI") {
            const safeText = last.text || "";
            const safeChunk = chunkText || "";
            update[update.length - 1] = { ...last, text: safeText + safeChunk };
          }
          return update;
        });
      },
      onStatus: (step) => {
        setStatus({ step: step });
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.type === "SERVER_STATUS")
            return [...prev.slice(0, -1), { text: step, type: "SERVER_STATUS" }];
          return [...prev, { text: step, type: "SERVER_STATUS" }];
        });
      },
      onError: (step) => {
        setError(step);
        setStatus({ step: step });
        setLoading(false);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.type === "SERVER_STATUS")
            return [...prev.slice(0, -1), { text: step, type: "SERVER_STATUS" }];
          return [...prev, { text: step, type: "SERVER_STATUS" }];
        });
      },
      onResult: (data) => {
        setResult(data);
        setMessages((prev) => {
          if (data && (Array.isArray(data) ? data.length > 0 : true)) {
            return [...prev, { items: data, type: "CARD" }];
          }
          return prev;
        });
        setLoading(false);
      },
      onSuccess: (step) => {
        setStatus({ step: "idle" })
      }
    });
  };

  return {
    messages,
    sendMessage,
    error,
    status,
    result,
    chatLoading,
  };
}
