import {MapButton, ExitButton, ThemeButton, HomeButton} from "../icons"
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
<<<<<<< HEAD
    <aside className="hidden lg:flex flex-col w-fit p-6 h-screen bg-(--sidebar-color) border-r border-r-gray-800">
      <nav className="flex flex-col flex-1 w-full items-start justify-between">
        <div className="flex flex-col h-auto">
          <ButtonLayout onClick={() => handleClick("home")} label={"Inicio"}>
=======
    <aside className="hidden lg:flex flex-col w-fit p-6 h-full bg-(--sidebar-color) border-r border-r-gray-800 transition-transform duration-300 ease-in">
      <nav className="flex flex-col flex-1 w-full items-start justify-between">
        <div className="flex flex-col h-auto gap-4">
          <ButtonLayout
            type={"button"}
            onClick={() => handleClick("home")}
            label={"Inicio"}
            label_style={""}
          >
>>>>>>> ca1995732dafefc665fd592eb2f9defc43c4ff62
            <HomeButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>

          <ButtonLayout
            onClick={() => handleClick("map")}
            label={"Mapa Interactivo"}
          >
            <MapButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
        </div>

        <div className="flex flex-col justify-between w-full h-auto pb-2 gap-3">
          <ButtonLayout
            onClick={() => handleClick("theme")}
            label={"Modo Oscuro"}
          >
            <ThemeButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
          <ButtonLayout
            onClick={() => handleClick("exit")}
            label={"Cerrar Sesión"}
          >
            <ExitButton fill_col="fill-(--sb-button-iddle)" />
          </ButtonLayout>
        </div>
      </nav>
    </aside>
  );
}
