import { useState } from "react";
import { send_request } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({step: "idle"});
  const [result, setResult] = useState(null);
  const [chatLoading, setLoading] = useState(false);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev,{ text, type: "USER" }, { text: "", type: "AI" }]);
    setLoading(true);
    
    send_request(text, {
      onChunk: (chunkText) =>{
        setLoading(false);
        setMessages((prev) => {
          const update = [...prev];
          if(update[update.length - 1]?.type === "SERVER_STATUS")
            update.pop();
          const last = update[update.length - 1];
          if(last.type === "AI")
            update[update.length-1] = {...last, text: last.text + chunkText};
          return update;
        });
      },
      onStatus: (step) =>{
        setStatus({step: step});
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if(last?.type === "SERVER_STATUS")
            return [...prev.slice(0, -1),  {text: step, type: "SERVER_STATUS"}];
          return [...prev, {text: step, type: "SERVER_STATUS"}];
        });
      },
      onError: (step) =>{
        setError(step);
        setStatus({step: step});
        setLoading(false);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if(last?.type === "SERVER_STATUS")
            return [...prev.slice(0, -1),  {text: step, type: "SERVER_STATUS"}];
          return [...prev, {text: step, type: "SERVER_STATUS"}];
        });
      },
      onResult: (data) => {
        setResult(data);
        setStatus({step: "Success"});
        setLoading(false);
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
