import HomeView from "./pages/home-view/home_view";
import ChatView from "./pages/chat-view/chat_view";
import MapView from "./pages/map-view/map_view";
import SideBar from "./components/sidebar/sideBar";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (text) => {
    const newMessage = { text, type: "USER" };
    setMessages((prev) => [...prev, newMessage]);

    console.log("Mensaje cargado" + text);
    navigate("/chat");
  };
  return (
    <div className="flex flex-row h-dvh w-dvw">
      <SideBar />
      <main className="flex flex-col justify-center items-center flex-1 relative">
        <Routes>
          <Route path="/" element={<HomeView onSend={handleSendMessage} />} />
          <Route
            path="/chat"
            element={
              <ChatView messages={messages} onSend={handleSendMessage} />
            }
          />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </main>
    </div>
  );
}
