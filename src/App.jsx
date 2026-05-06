import SystemLayout from "./components/layouts/SystemLayout";
import HomeView from "./pages/home-view/home_view";
import ChatView from "./pages/chat-view/chat_view";
import MapView from "./pages/map-view/map_view";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./pages/pageNotFound-view/NotFound";
import { supabase } from "./services/server/database/supabase";
import AuthView from "./pages/auth-view/auth_view";
import AuthLayout from "./components/layouts/AuthLayout";
import { send_request } from "./services/api";

export default function App() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading ,setLoading] = useState(true);

  const session = supabase.auth.getSession();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
      setLoading(true)
    });
  }, [navigate]);

  const handleSendMessage = (text) => {
    const newMessage = { text, type: "USER" };
    setMessages((prev) => [...prev, newMessage]);

    send_request(text);
    navigate("/chat");
  };

  if(loading){
    return <div className="flex flex-col justify-center items-center w-dvw h-dvh bg-zinc-950">
      <h1 className="text-indigo-100 text-2xl">
        Cargando...
      </h1>
      </div> //Crear loading
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthView />} />
      </Route>
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
