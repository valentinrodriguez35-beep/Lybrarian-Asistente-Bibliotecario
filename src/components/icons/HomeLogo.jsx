import React from "react";
import ProyectLogo from "./ProyectLogo";

export default function HomeLogo() {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start w-auto h-auto gap-2 pb-8">
      <div className="flex flex-row items-center justify-center gap-4 pb-4">
        <ProyectLogo h="55" w="55" effect="logo-effect" />
        <h1>
          <span className="text-[#93C5FD] font-medium text-4xl text-center animate-fade-in-up animate-duration-500 hidden md:block">
            Lybrarian
          </span>
        </h1>
      </div>
      <h2>
        <span className="text-gray-200 my-4 text-2xl md:text-4xl text-center font-light animate-fade-in-up animate-duration-500 animate-delay-150">
          ¿Qué te gustaría encontrar hoy?
        </span>
      </h2>
    </div>
  );
}
