import React from "react";
import styles from "./map_view.module.css";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";
import MapArticles from "../../components/mapArticles/MapArticles";

export default function MapView() {
  //Manejar la logica de mapas
  return (
    <section className="bg-black flex flex-row h-full w-full animate-fade-in">
      <div className="h-full w-auto">
        <MapArticles />
      </div>
      <div className=" bg-black h-full w-full flex text-white">
        <InteractiveMap />
      </div>
    </section>
  );
}
