import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import ProyectLogo from "../../assets/ProyectLogo";
import MessageInput from "../../components/messageInput/messageInput";
import { supabase } from "../../services/server/database/supabase";
import { useNavigate } from "react-router";
import HomeLogo from "../../assets/HomeLogo";

export default function HomeView({ onSend }) {
  return (
    <section
      id="home-view"
      className="flex flex-col justify-center-safe 
      items-start h-dvh w-2xl animate-fade-in animate-duration-500"
    >
      <HomeLogo />
      <MessageInput onSend={onSend} />
    </section>
  );
}
