import React from "react";
import styles from "./map_view.module.css";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";
import MapArticles from "../../components/mapArticles/MapArticles";
import ViewLayout from "../../components/layouts/ViewLayout";

export default function MapView() {
  //Manejar la logica de mapas
  return (
    <ViewLayout className="flex flex-row w-full">
      <aside className="flex flex-col w-fit h-full">
        <MapArticles />
      </aside>
      <main className=" bg-black flex flex-1 text-white">
        <InteractiveMap />
      </main>
    </ViewLayout>
  );
}
