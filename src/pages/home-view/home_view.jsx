import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import ProyectLogo from "../../assets/ProyectLogo";
import MessageInput from "../../components/messageInput/messageInput";
import { supabase } from "../../services/server/database/supabase";
import { useNavigate } from "react-router";
import HomeLogo from "../../assets/HomeLogo";

export default function HomeView({ onSend }) {
  return (
    <section className="bg-[#0B0C0C] flex flex-1 flex-col justify-center items-center w-full h-screen animate-fade-in">
      <div className="w-full max-w-3xl h-full px-12">
        <HomeLogo />
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
