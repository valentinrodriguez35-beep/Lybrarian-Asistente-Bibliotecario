import SystemLayout from "./layouts/SystemLayout";
import HomeView from "./pages/home-view/home_view";
import ChatView from "./pages/chat-view/chat_view";
import MapView from "./pages/map-view/map_view";
import SignIn from "./pages/auth-view/Sign_In/sign_in";
import "./App.css";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import NotFound from "./pages/pageNotFound-view/NotFound";

export default function App() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (text) => {
    const newMessage = { text, type: "USER" };
    setMessages((prev) => [...prev, newMessage]);

    console.log("Mensaje cargado" + text);
    navigate("/chat");
  };
  var aux = false;

  if (aux) return <SignIn />;

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
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
