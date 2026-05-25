import ArticleLayout from "./articleLayout/ArticleLayout";
import {tijuana, mexicali, ensenada} from "../../services/map";
import InteractiveMap from "../../components/interactiveMap/interactiveMap";

export default function MapArticles({mapRef}) {
  return (
    <nav className="flex flex-col h-full w-full border-r border-[#252d3f] gradient-container">
      <div className="flex flex-col flex-1 w-full items-center justify-start gap-6 py-12 px-4 overflow-y-auto no-scrollbar">
        <ArticleLayout
          name="Biblioteca Central Tijuana"
          status="abierto_marker"
          statusText="abierto_text"
          coords={[tijuana[0],tijuana[1]]}
          mapRef={mapRef}
        />
        <ArticleLayout
          name="Biblioteca Central Ensenada"
          status="abierto_marker"
          statusText="abierto_text"
          coords={[ensenada[0],ensenada[1]]}
          mapRef={mapRef}
        />
        <ArticleLayout
          name="Biblioteca Central Mexicali"
          status="cerrado_marker"
          statusText="cerrado_text"
          coords={[mexicali[0],mexicali[1]]}
          mapRef={mapRef}
        />
        <ArticleLayout
          name="Biblioteca Valle Dorado"
          status="cerrado_marker"
          statusText="cerrado_text"
        />
        <ArticleLayout
          name="Placeholder"
          status="abierto_marker"
          statusText="abierto_text"
        />
        <ArticleLayout
          name="Placeholder"
          status="abierto_marker"
          statusText="abierto_text"
        />
        <ArticleLayout
          name="Placeholder"
          status="cerrado_marker"
          statusText="cerrado_text"
        />
      </div>
    </nav>
  );
}
