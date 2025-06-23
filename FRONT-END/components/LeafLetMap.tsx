import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images directly
import marker from '../public/images/marker-icon.png';
import marker2x from '../public/images/marker-icon-2x.png';
import markerShadow from '../public/images/marker-shadow.png';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude, longitude, onLocationChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      leafletMap.current = L.map(mapRef.current).setView([latitude, longitude], 10);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);

      // Configure the default marker icon
      const defaultIcon = L.icon({
        iconRetinaUrl: marker2x.src,
        iconUrl: marker.src,
        shadowUrl: markerShadow.src,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = defaultIcon;

      const handleMapClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onLocationChange(lat, lng);

        // Remove previous marker if it exists
        if (markerRef.current) {
          leafletMap.current?.removeLayer(markerRef.current);
        }

        // Add a new marker
        markerRef.current = L.marker([lat, lng]).addTo(leafletMap.current);
      };

      leafletMap.current.on('click', handleMapClick);

      return () => {
        if (leafletMap.current) {
          leafletMap.current.off('click', handleMapClick);
          leafletMap.current.remove();
          leafletMap.current = null;
          markerRef.current = null;
        }
      };
    }
  }, [latitude, longitude, onLocationChange]);

  return <div ref={mapRef} style={{ height: '300px', width: '100%' }} className="rounded-md z-0" />;
};

export default LeafletMap;