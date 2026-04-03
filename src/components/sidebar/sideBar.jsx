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
    <aside className="flex flex-col w-18 h-dvh bg-(--sidebar-color)">
      <nav className="flex flex-col justify-between items-center-safe h-full">
        <div className="flex flex-col justify-center items-center my-0 mx-auto gap-6 p-4 w-full h-18">
          <button
            type="button"
            className="bg-transparent border-none h-auto w-auto"
            onClick={() => handleClick("home")}
          >
            <div className="h-8 w-8 cursor-pointer">
              <HomeButton />
            </div>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-0 mx-auto gap-6 p-4 w-full h-45">
          <button
            type="button"
            className="bg-transparent border-none h-auto w-auto"
            onClick={() => handleClick("map")}
          >
            <div className="h-8 w-8 cursor-pointer">
              <MapButton />
            </div>
          </button>
          <button
            type="button"
            className="bg-transparent border-none h-auto w-auto"
          >
            <div className="h-8 w-8 cursor-pointer">
              <ThemeButton />
            </div>
          </button>
          <button type="button" className={styles.exitBtn}>
            <div className="h-8 w-8 cursor-pointer">
              <ExitButton />
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}
