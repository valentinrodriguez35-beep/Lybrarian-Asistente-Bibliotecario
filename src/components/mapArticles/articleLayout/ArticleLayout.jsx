import L from "leaflet";

export default function ArticleLayout({ name, status, statusText, coords, mapRef }) {
  const handleClick = () => {
    if (mapRef && mapRef.current && coords) {
      const latlng = L.latLng(coords[0], coords[1]);
      mapRef.current.flyTo(latlng, 14, { animate: true, duration: 1.5 });
    }
  }
  return (
    <button className="h-37.5 w-65 bg-(--info-tarjeta-color) 
                      border border-(--info-tarjeta-pressed) rounded-3xl px-5! py-5! 
                      cursor-pointer hover:bg-(--info-tarjeta-pressed) transition-colors duration-300"
            onClick={handleClick}
                      >
      <h1 className="text-[1rem] font-medium text-white pb-5">{name}</h1>
      <footer className="text-[.9rem] font-medium text-left text-white">
        <p>Horario:</p>
        <time className={`text-shadow-2xs ${statusText}`}>10:00 - 20:00</time>
        <div className="flex flex-row items-center-safe h-auto w-full gap-1.5 pt-1">
          <div className={`h-4 w-4 ${status} rounded-full`} />
          <div className={`h-1.5 w-full ${status} border-0`} />
        </div>
      </footer>
    </button>
  );
}
