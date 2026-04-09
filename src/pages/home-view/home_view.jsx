import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import ProyectLogo from "../../assets/ProyectLogo";
import MessageInput from "../../components/messageInput/messageInput";
import { supabase } from "../../services/server/database/supabase";
import { useNavigate } from "react-router";
import HomeLogo from "../../assets/HomeLogo";

export default function HomeView({ onSend }) {
  return (
    <section className="flex flex-col p-8 h-full w-full">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <HomeLogo />
        <MessageInput onSend={onSend} />
      </div>
    </section>
  );
}
