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
      className="flex flex-1 flex-col w-full justify-center 
      items-center animate-fade-in animate-duration-500"
    >
      <div className="w-full max-w-3xl px-12">
        <HomeLogo />
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
