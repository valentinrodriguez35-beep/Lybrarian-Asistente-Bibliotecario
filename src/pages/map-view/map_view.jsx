import React from "react";
import styles from "./map_view.module.css";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";
import MapArticles from "../../components/mapArticles/MapArticles";
import ViewLayout from "../../layouts/ViewLayout";

export default function MapView() {
  //Manejar la logica de mapas
  return (
    <ViewLayout>
      <div  className="flex flex-col h-full w-xs overflow-y-auto">
        <MapArticles />
      </div>
      <div className=" bg-black h-full w-full flex text-white">
        <InteractiveMap />
      </div>
    </ViewLayout>
  );
}
