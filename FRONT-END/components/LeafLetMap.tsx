import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  onLocationChange,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Create map instance
      mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      // Add initial marker if coordinates are valid
      if (latitude && longitude) {
        markerRef.current = L.marker([latitude, longitude], { icon: defaultIcon })
          .addTo(mapInstance.current);
      }

      setIsInitialized(true);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Handle map click events after initialization
  useEffect(() => {
    if (!mapInstance.current || !isInitialized) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: defaultIcon })
          .addTo(mapInstance.current!);
      }
      
      // Notify parent component
      onLocationChange(lat, lng);
    };

    mapInstance.current.on("click", handleMapClick);

    return () => {
      mapInstance.current?.off("click", handleMapClick);
    };
  }, [isInitialized, onLocationChange]);

  // Update view when props change
  useEffect(() => {
    if (mapInstance.current && latitude && longitude) {
      mapInstance.current.setView([latitude, longitude]);
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], { icon: defaultIcon })
          .addTo(mapInstance.current);
      }
    }
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      style={{ height: "300px", width: "100%" }}
      className="rounded-md z-0"
    />
  );
};

export default LeafletMap;