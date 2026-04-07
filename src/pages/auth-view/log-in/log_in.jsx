import React, { useState, useEffect } from "react";
import styles from "../log-in/log_in.module.css";
import { supabase } from "../../../services/server/database/supabase";
import { useNavigate } from "react-router";
import Icon8Google from "../../../assets/icon8Google";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (!error) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProviderSubmit = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center-safe items-center-safe gap-6">
      <h1 className="text-white font-bold text-5xl text-center">Lybrarian</h1>
      <h2 className="text-gray-200 font-normal text-2xl text-center font-stretch-50%">
        Bienvenido. Por favor, identificate.
      </h2>
      <form
        className="w-full h- flex flex-col gap-6 pt-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full gap-6">
          <input
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input_field}
          />
          <button className="bg-red-50 h-16 border rounded-2xl">Send</button>
        </div>
        <div>
          <div className="h-px bg-gray-700/50 border-0" />
        </div>
        <div>
          <button
            className="p-4! flex flex-row items-center gap-6 h-16 w-full bg-[#0e1014] text-white rounded-2xl font-semibold text-xl google-focus"
            type="button"
            onClick={handleProviderSubmit}
          >
            <Icon8Google />
            Iniciar Sesión con Google
          </button>
        </div>
      </form>
    </div>
  );
}
