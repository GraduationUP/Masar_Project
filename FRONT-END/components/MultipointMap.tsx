import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define types
type Coordinate = [number, number];
type Marker = L.Marker;

interface LeafletMapProps {
  onCoordinatesChange: (coordinates: Coordinate[]) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({onCoordinatesChange}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mapContainer = L.DomUtil.get("map");

      if (mapContainer && !mapContainer._leaflet_id && !mapRef.current) {
        const map = L.map(mapContainer).setView([31.5069, 34.4560], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        map.on("click", handleMapClick);
        mapRef.current = map;
      }

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    onCoordinatesChange(coordinates);
  })

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (typeof window !== "undefined" && mapRef.current) {
      const { lat, lng } = e.latlng;
      const marker = L.marker([lat, lng]).addTo(mapRef.current);
      marker
        .bindPopup(`Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        .openPopup();
      markersRef.current = [...markersRef.current, marker];
      setCoordinates((prev) => [...prev, [lat, lng]]);
    }
  };

  const handleResetMarkers = () => {
    if (typeof window !== "undefined" && mapRef.current) {
      markersRef.current.forEach((marker) => {
        mapRef.current?.removeLayer(marker);
      });
      markersRef.current = [];
      setCoordinates([]);
      onCoordinatesChange([]);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div id="map" className="absolute top-0 bottom-0 left-0 right-0" style={{ height: '100%', width: '100%' }} />
      <div className="absolute top-1 left-1 z-[1000] bg-background p-3 rounded shadow">
        <button
          onClick={handleResetMarkers}
          className="bg-blue-500 hover:bg-blue-600 text-foreground py-2 px-4 rounded mb-2"
        >
          اعادة ضبط النقاط
        </button>
        <p className="text-sm">اضغط على الخريطة لتحديد مسار السوق</p>
      </div>
    </div>
  );
};

export default LeafletMap;