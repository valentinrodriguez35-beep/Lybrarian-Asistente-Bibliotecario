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
    <aside className="hidden sm:flex flex-col w-fit p-6 h-screen bg-(--sidebar-color) border-r border-r-gray-800 transition-transform duration-300 ease-in">
      <nav className="flex flex-col flex-1 w-full items-start justify-between">
        <div className="flex flex-col h-auto">
          <ButtonLayout
            type={"button"}
            onClick={() => handleClick("home")}
            label={"Inicio"}
            label_style={""}
          >
            <HomeButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>

          <ButtonLayout
            type={"button"}
            onClick={() => handleClick("map")}
            label={"Mapa Interactivo"}
            label_style={""}
          >
            <MapButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
        </div>

        <div className="flex flex-col justify-between w-full h-auto pb-2 gap-3">
          <ButtonLayout
            type={"button"}
            onClick={() => handleClick("theme")}
            label={"Modo Oscuro"}
            label_style={""}
          >
            <ThemeButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
          <ButtonLayout
            type={"button"}
            onClick={() => handleClick("exit")}
            label={"Cerrar Sesión"}
            label_style={""}
          >
            <ExitButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
        </div>
      </nav>
    </aside>
  );
}
