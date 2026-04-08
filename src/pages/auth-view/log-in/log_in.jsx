import React, { useState, useEffect } from "react";
import styles from "../log-in/log_in.module.css";
import { supabase } from "../../../services/server/database/supabase";
import { useNavigate } from "react-router";
import Icon8Google from "../../../assets/icon8Google";
import ProyectLogo from "../../../assets/ProyectLogo";

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
    <section className="h-dvh w-full flex flex-col justify-center-safe items-center-safe gap-12 animate-fade-in animate-duration-500">
      <div className="h-auto w-auto flex flex-col justify-center-safe items-center-safe ">
        <ProyectLogo h="100" w="100" effect="logo-effect" />
      </div>
      <div className="flex flex-col w-auto h-auto gap-4 justify-center-safe items-center-safe pb-4!">
        <h1>
          <span className="text-[#93C5FD] font-medium text-5xl text-center animate-fade-in-up animate-duration-1000 animate-delay-150">
            Lybrarian
          </span>
        </h1>
        <h2>
          <span className="text-gray-200 font-normal text-2xl text-center animate-fade-in-up animate-duration-1000 animate-delay-250">
            Bibliotecario Universitario
          </span>
        </h2>
      </div>
      <form className="w-full h- flex flex-col gap-20" onSubmit={handleSubmit}>
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
          <button className="bg-(--boton-bg-pressed) h-16 border rounded-2xl border-none text-zinc-50 text-xl font-semibold text-center cursor-pointer">
            Iniciar Sesión
          </button>
        </div>
        <div className="flex flex-col gap-8 pt-12!">
          <div>
            <div className="h-px bg-gray-700/50 border-0" />
          </div>
          <div>
            <button
              className="p-4! flex flex-row items-center justify-center rounded-2xl gap-6 h-16 w-full
             bg-[#0e1014] google-focus
             cursor-pointer"
              type="button"
              onClick={handleProviderSubmit}
            >
              <Icon8Google />
              <span className="text-white font-semibold text-xl text-center">
                Iniciar Sesión con Google
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
