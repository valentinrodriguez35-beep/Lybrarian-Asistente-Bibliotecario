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
    <section className="flex-1 flex flex-col w-full justify-center-safe items-center-safe gap-10 animate-fade-in animate-duration-500">
      <div className="flex flex-col justify-center-safe items-center-safe ">
        <ProyectLogo h="100" w="100" effect="logo-effect" />
      </div>
      <div className="flex flex-col w-auto h-auto gap-4 justify-center-safe items-center-safe">
        <h1>
          <span className="text-[#93C5FD] font-bold text-4xl md:text-5xl text-center animate-fade-in-up">
            Lybrarian
          </span>
        </h1>
        <h2>
          <span className="text-gray-200 font-normal text-lg md:text-xl text-center animate-fade-in-up animate-delay-150">
            Bibliotecario Universitario
          </span>
        </h2>
      </div>
      <form className="flex flex-col flex-1 gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex w-auto">
            <input
              type="text" //Solo recuperaremos el nombre de usuario
              name="email"
              placeholder="Nombre de Usuario"
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-(--caja-mensaje) h-16 rounded-l-2xl border border-transparent whitespace-nowrap px-4!
               text-white font-normal text-[1rem] tracking-[1px] focus: ease-in-out duration-300 transition-colors"
            />
            <div className="flex flex-col justify-center-safe h-16 rounded-r-2xl tracking-[1px] px-4 whitespace-nowrap bg-blue-900">
              <span className="text-white font-normal text-[1rem] ">
                @uabc.edu.mx
              </span>
            </div>
          </div>
          <button className="bg-(--boton-bg-pressed) h-16 border rounded-2xl border-none text-zinc-50 text-xl font-semibold text-center cursor-pointer">
            Iniciar Sesión
          </button>
        </div>
        <div className="flex flex-col w-full gap-6 pt-12">
          <div>
            <div className="h-px bg-gray-700/50 border-0" />
          </div>
          <div>
            <button
              className="p-4 flex flex-row items-center justify-center rounded-2xl gap-6 h-16 w-full
             bg-[#0e1014] google-focus
             cursor-pointer"
              type="button"
              onClick={handleProviderSubmit}
            >
              <Icon8Google />
              <span className="text-white font-semibold text-xl text-center">
                Google
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
