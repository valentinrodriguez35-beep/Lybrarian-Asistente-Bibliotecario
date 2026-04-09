import React from "react";
import styles from "./sideBar.module.css";
import MapButton from "../../assets/MapButton";
import ExitButton from "../../assets/ExitButton";
import HomeButton from "../../assets/HomeButton";
import ThemeButton from "../../assets/ThemeButton";
import { useNavigate } from "react-router";
import { supabase } from "../../services/server/database/supabase";
import ButtonLayout from "./ButtonLayout/ButtonLayout";

export default function SideBar() {
  const navigate = useNavigate();
  const handleClick = async (toGo) => {
    if (toGo === "map") navigate("/map");
    if (toGo === "home") navigate("/");
    if (toGo === "exit") {
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  return (
    <aside className="flex flex-col items-start min-w-fit p-6 h-screen bg-(--sidebar-color) border-r border-r-gray-800">
      <nav className="flex flex-col flex-1 items-start justify-between">
        <div className="flex flex-col h-auto">
          <ButtonLayout onClick={() => handleClick("home")} label={"Inicio"}>
            <div className="flex flex-row items-center gap-3 h-12 w-auto cursor-pointer py-2">
              <HomeButton fill_col="#66718a" />
            </div>
          </ButtonLayout>
          
          <ButtonLayout onClick={() => handleClick("map")} label={"Mapa Interactivo"}>
            <div className="flex flex-row items-center gap-3 h-12 w-auto cursor-pointer py-2">
              <MapButton fill_col="#66718a" />
            </div>
          </ButtonLayout>
        </div>
        <div className="flex flex-col justify-between w-full h-auto pb-2 gap-3">
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("theme")}
          >
            <div className="flex flex-row items-center gap-3 h-12 w-auto cursor-pointer py-2">
              <ThemeButton fill_col="#4e576a" />
              <span className="text-l font-medium text-hover whitespace-nowrap">
                Modo Oscuro
              </span>
            </div>
          </button>
          <button
            type="button"
            className="bg-transparent border-none h-15 w-auto"
            onClick={() => handleClick("exit")}
          >
            <div className="flex flex-row items-center gap-3 h-12 w-auto cursor-pointer py-2">
              <ExitButton fill_col="#4e576a" />
              <span className="text-l font-medium text-hover">
                Cerrar Sesion
              </span>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}
