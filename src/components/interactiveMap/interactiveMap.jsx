import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { tijuana, mexicali, ensenada } from "../../services/map";
import book_icon from "../../assets/book_icon.svg";

function MapController({ mapRef }) {
  const map = useMap();
  useEffect(() => {
    if (mapRef) mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

export default function InteractiveMap({ mapRef }) {
  const customIcon = L.icon({
    iconUrl: book_icon,
    iconSize: [32, 32],
    iconAnchor: [32, 32],
  });

  return (
    <MapContainer
      center={[32.531068186619464, -116.96241874874181]}
      zoom={13}
      className="w-full h-full"
    >
      <MapController mapRef={mapRef} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[tijuana[0], tijuana[1]]} icon={customIcon}>
        <Popup>Biblioteca Central Tijuana</Popup>
      </Marker>
      <Marker position={[mexicali[0], mexicali[1]]} icon={customIcon}>
        <Popup>Biblioteca Central Mexicali</Popup>
      </Marker>
      <Marker position={[ensenada[0], ensenada[1]]} icon={customIcon}>
        <Popup>Biblioteca Central Ensenada</Popup>
      </Marker>
    </MapContainer>
  );
}
