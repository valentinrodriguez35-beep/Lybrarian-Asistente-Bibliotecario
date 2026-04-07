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
    //En caso de que el usuario haya anotado un arroba
    if (email.includes("@")) {
      console.log(
        `${email}@uabc.edu.mx` +
          " Es un formato invalido de correo electronico.",
      ); //Debugging
    }
    const userEmail = `${email}@uabc.edu.mx`; //Concatenamos con el dominio
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: userEmail,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (!error) {
        navigate("/");
      } else {
        console.log(error); //Depuracion
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
    <div className="h-full w-full flex flex-col justify-center-safe items-center-safe gap-12">
      <div className="flex flex-col w-auto h-auto gap-4">
        <h1 className="text-white font-bold text-5xl text-center">Lybrarian</h1>
        <h2 className="text-gray-200 font-normal text-2xl text-center font-stretch-50%">
          Bienvenido. Por favor, identificate.
        </h2>
      </div>
      <form className="w-full h- flex flex-col gap-12" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-row w-full h-auto">
            <input
              type="text" //Solo recuperaremos el nombre de usuario
              name="email"
              placeholder="Nombre de Usuario"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input_field}
            />
            <div
              className="flex flex-col justify-center-safe h-16 w-full rounded-2xl 
            rounded-bl-none rounded-tl-none text-white font-normal text-[1rem] tracking-[1px] pl-4! bg-blue-900"
            >
              @uabc.edu.mx
            </div>
          </div>
          <button className="bg-red-50 h-16 border rounded-2xl text-zinc-950 text-xl font-semibold text-center">
            Iniciar Sesión
          </button>
        </div>
        <div>
          <div className="h-px bg-gray-700/50 border-0" />
        </div>
        <div>
          <button
            className="p-4! flex flex-row items-center justify-center gap-6 h-16 w-full
             bg-[#0e1014] text-white rounded-2xl font-semibold text-xl text-center google-focus
             cursor-pointer"
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
