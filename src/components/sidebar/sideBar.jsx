import React from "react";
import styles from "./sideBar.module.css";
import MapButton from "../../assets/MapButton";
import ExitButton from "../../assets/ExitButton";
import HomeButton from "../../assets/HomeButton";
import ThemeButton from "../../assets/ThemeButton";
import { useNavigate } from "react-router";

export default function sideBar() {
  const navigate = useNavigate();
  const handleClick = (toGo) => {
    if (toGo === "map") navigate("/map");
    if (toGo === "home") navigate("/");
  };

  return (
    <aside className="flex flex-col items-center w-35 h-dvh bg-(--sidebar-color) border-r border-r-gray-800">
      <nav className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-center items-start gap-6 h-18">
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("home")}
          >
            <div className="flex flex-row items-center gap-4 h-12 w-auto cursor-pointer">
              <HomeButton fill_col="lightblue" />
              <text className="text-l font-medium text-gray-400">Inicio</text>
            </div>
          </button>
        </div>
        <div className="flex flex-col justify-between gap-2 w-full h-auto p-10">
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("map")}
          >
            <div className="flex flex-row items-center gap-4 h-12 w-auto cursor-pointer">
              <MapButton />
              <text className="text-l font-medium text-gray-400">Mapa</text>
            </div>
          </button>
          <button
            type="button"
            className="bg-black border border-gray-800 rounded-full h-auto w-32"
            onClick={() => handleClick("theme")}
          >
            <div className="flex flex-row items-center gap-2 h-12 w-auto cursor-pointer">
              <ThemeButton />
              <text className="text-l font-medium text-gray-500">Nocturno</text>
            </div>
          </button>
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
          >
            <div className="flex flex-row items-center gap-4 h-12 w-auto cursor-pointer">
              <ExitButton />
              <text className="text-l font-medium text-gray-400">Salir</text>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}
