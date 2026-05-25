import InteractiveMap from "../../components/interactiveMap/interactiveMap";
import MapArticles from "../../components/mapArticles/MapArticles";
import ViewLayout from "../../components/layouts/ViewLayout";
import {useRef} from "react"

export default function MapView() {
  const mapRef = useRef(null);
  //Manejar la logica de mapas
  return (
    <ViewLayout className="flex flex-row w-full">
      <aside className="flex flex-col w-fit h-full">
        <MapArticles mapRef={mapRef}/>
      </aside>
      <main className=" bg-black flex flex-1 text-white">
        <InteractiveMap mapRef={mapRef} />
      </main>
    </ViewLayout>
  );
}