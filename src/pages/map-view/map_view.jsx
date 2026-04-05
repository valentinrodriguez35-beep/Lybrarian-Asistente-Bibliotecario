import React from "react";
import styles from "./map_view.module.css";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";

export default function MapView() {
  //Manejar la logica de mapas
  return (
    <section className="bg-black flex flex-row h-full w-full animate-fade-in">
      <div className="bg-[#0B0C0C] h-full w-81.25 border-r border-[#393D41] no-scrollbar"></div>
      <div className="bg-black h-full w-full flex text-white">
        <InteractiveMap />
      </div>
    </section>
  );
}
