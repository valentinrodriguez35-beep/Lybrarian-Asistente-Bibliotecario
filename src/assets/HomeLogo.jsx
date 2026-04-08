import React from "react";
import ProyectLogo from "./ProyectLogo";

export default function HomeLogo() {
  return (
    <div className="flex flex-col w-auto h-auto gap-2 pb-8!">
      <div className="flex flex-row items-center-safe gap-4 pb-4!">
        <ProyectLogo h="55" w="55" effect="logo-effect" />
        <h1>
          <span className="text-[#93C5FD] font-medium text-4xl animate-fade-in-up animate-duration-1000 animate-delay-150">
            Lybrarian
          </span>
        </h1>
      </div>
      <div>
        <h2>
          <span className="text-gray-200 py-4! text-4xl font-light animate-fade-in-up animate-duration-1000 animate-delay-250">
            ¿Qué te gustaría encontrar hoy?
          </span>
        </h2>
      </div>
    </div>
  );
}
