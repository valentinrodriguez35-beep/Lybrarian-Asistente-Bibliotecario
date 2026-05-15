import { useState } from "react";
import { send_request } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({step: "idle"});
  const [result, setResult] = useState(null);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev,{ text, type: "USER" }]);
    setMessages((prev) => [...prev,{ text: "", type: "AI" }]);

    send_request(text, {
      onChunk: (chunkText) =>{
        setMessages((prev) => {
          const update = [...prev];
          const last = update[update.length - 1];
          update[update.length-1] = {...last, text: last.text + chunkText};
          return update;
        });
      },
      onStatus: (step) =>{
        setStatus(step);
        const aiMessage = { text: step, type: "AI" };
        setMessages((prev) => [...prev, aiMessage]);
      },
      onError: (errStep) => {
        setError(errStep);
        setStatus(errStep);
        const aiMessage = { text: errStep, type: "AI" };
        setMessages((prev) => [...prev, aiMessage]);
      },
      onResult: (result) => {
        setResult(result);
        setStatus({step: "Success"}); //Remember to use this result inside a card in the front end
      }
    });
  };

  return {
    messages,
    sendMessage,
    error,
  };
}
