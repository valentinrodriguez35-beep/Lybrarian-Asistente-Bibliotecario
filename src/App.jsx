import SystemLayout from "./layouts/SystemLayout";
import HomeView from "./pages/home-view/home_view";
import ChatView from "./pages/chat-view/chat_view";
import MapView from "./pages/map-view/map_view";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./pages/pageNotFound-view/NotFound";
import { supabase } from "./services/server/database/supabase";
import AuthView from "./pages/auth-view/auth_view";

export default function App() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const session = supabase.auth.getSession();
  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      if (!session) {
        navigate("/login");
      }
    });
  }, [session, navigate]);

  const handleSendMessage = (text) => {
    const newMessage = { text, type: "USER" };
    setMessages((prev) => [...prev, newMessage]);

    console.log("Mensaje cargado" + text);
    navigate("/chat");
  };

  return (
    <Routes>
      <Route path="/login" element={<AuthView />} />
      <Route element={<SystemLayout />}>
        <Route path="/" element={<HomeView onSend={handleSendMessage} />} />
        <Route
          path="/chat"
          element={<ChatView messages={messages} onSend={handleSendMessage} />}
        />
        <Route path="/map" element={<MapView />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
