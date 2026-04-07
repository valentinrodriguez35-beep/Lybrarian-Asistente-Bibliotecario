import React, { useEffect } from "react";
import styles from "./home_view.module.css";
import ProyectLogo from "../../assets/ProyectLogo";
import MessageInput from "../../components/messageInput/messageInput";
import { supabase } from "../../services/server/database/supabase";
import { useNavigate } from "react-router";

export default function HomeView({ onSend }) {
  const navigate = useNavigate();
  useEffect(() => {
    //No hay usuario previamente registrado
    if (!supabase.auth.getUser()) navigate("/login");
  }, [navigate]);

  return (
    <section
      id="home-view"
      className="flex flex-col justify-center 
      items-center h-screen w-full my-0 mx-auto 
      animate-fade-in animate-duration-200 bg-[#0a0a0a]"
    >
      <div className={styles.header}>
        <div className={styles.header_logo}>
          <div className={styles.logo}>
            <ProyectLogo />
          </div>
          <div className={styles.proyect_name}>Lybrarian</div>
        </div>
        <div className={styles.header_ask}>¿Qué te gustaría encontrar hoy?</div>
      </div>
      <MessageInput onSend={onSend} />
    </section>
  );
}
