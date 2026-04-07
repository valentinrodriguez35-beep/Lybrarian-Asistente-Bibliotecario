import React from "react";
import styles from "./sideBar.module.css";
import MapButton from "../../assets/MapButton";
import ExitButton from "../../assets/ExitButton";
import HomeButton from "../../assets/HomeButton";
import ThemeButton from "../../assets/ThemeButton";
import { useNavigate } from "react-router";
import { supabase } from "../../services/server/database/supabase";

export default function SideBar() {
  const navigate = useNavigate();
  const handleClick = (toGo) => {
    if (toGo === "map") navigate("/map");
    if (toGo === "home") navigate("/");
    if (toGo === "exit") supabase.auth.signOut();
  };

  return (
    <aside className="flex flex-col items-center w-45 h-dvh bg-(--sidebar-color) border-r border-r-gray-800">
      <nav className="flex flex-col justify-between h-full">
        <div className="flex flex-col pl-12 h-auto">
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("home")}
          >
            <div className="flex flex-row items-end gap-3 h-12 w-auto cursor-pointer">
              <HomeButton fill_col="#66718a" />
              <span className="text-l font-medium text-hover">Inicio</span>
            </div>
          </button>
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("map")}
          >
            <div className="flex flex-row items-end gap-3 h-12 w-auto cursor-pointer">
              <MapButton fill_col="#66718a" />
              <span className="text-l font-medium text-hover">Mapa</span>
            </div>
          </button>
        </div>
        <div className="flex flex-col justify-between gap-2 w-full h-auto p-10">
          <button
            type="button"
            className="bg-black border border-gray-800 rounded-full h-auto w-32"
            onClick={() => handleClick("theme")}
          >
            <div className="flex flex-row items-center gap-2 h-12 w-auto cursor-pointer">
              <ThemeButton fill_col="#4e576a" />
              <span className="text-l font-medium text-hover">Nocturno</span>
            </div>
          </button>
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("exit")}
          >
            <div className="flex flex-row items-center gap-4 h-16 w-auto cursor-pointer border-t border-gray-500">
              <ExitButton fill_col="#4e576a" />
              <span className="text-l font-medium text-hover">Salir</span>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}
