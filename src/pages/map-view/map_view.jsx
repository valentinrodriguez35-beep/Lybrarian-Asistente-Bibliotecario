import React from "react";
import styles from "./map_view.module.css";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";
import MapArticles from "../../components/mapArticles/MapArticles";

export default function MapView() {
  //Manejar la logica de mapas
  return (
    <section className="bg-[#0B0C0C] flex flex-1 min-h-screen flex-row w-full animate-fade-in">
      <div className="w-full max-w-xs">
        <MapArticles />
      </div>
      <div className=" bg-black h-full w-full flex text-white">
        <InteractiveMap />
      </div>
    </section>
  );
}
