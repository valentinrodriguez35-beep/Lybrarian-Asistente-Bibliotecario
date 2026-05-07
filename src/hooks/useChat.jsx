import { useState } from "react";
import { send_request } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
    const newMessage = { text, type: "USER" };
    setMessages((prev) => [...prev, newMessage]);

    const aiResult = await send_request(text);

    const aiMessage = { text: aiResult.body, type: aiResult.rol };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return {
    messages,
    sendMessage,
    error,
  };
}
