import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet"; //libreria per permettere compatibilità
import { Map as leafletMap } from "leaflet"; //libreria non-react, infatti non funziona
import type { Place } from "../api/Place";
//useEffect e useRef li importo per gestire la renderizzazione automatica
import { useEffect, useRef } from "react";

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const mapRef = useRef<any>(null); //posso anche lasciare any, leaflet gestisce tutto

  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude], 13);
    }
  }, [place]); //si attiva ogni volta che place cambia

  return (
    <MapContainer
      ref={mapRef}
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/*place && <Marker position={[place.latitude, place.longitude]} />*/}
    </MapContainer>
  );
}
