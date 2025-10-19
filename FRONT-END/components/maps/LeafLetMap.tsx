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
  // Optional props for multi-marker support
  isMarketMode?: boolean;
  marketPoints?: [number, number][];
  onMarketPointAdd?: (point: [number, number]) => void;
  onMarketPointRemove?: (index: number) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  onLocationChange,
  isMarketMode = false,
  marketPoints = [],
  onMarketPointAdd,
  onMarketPointRemove,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const marketMarkersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
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

      // Add initial marker if coordinates are valid and not in market mode
      if (latitude && longitude && !isMarketMode) {
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
        marketMarkersRef.current = [];
        polylineRef.current = null;
      }
    };
  }, []);

  // Handle market points visualization
  useEffect(() => {
    if (!mapInstance.current || !isMarketMode) return;

    // Clear existing market markers
    marketMarkersRef.current.forEach(marker => {
      mapInstance.current?.removeLayer(marker);
    });
    marketMarkersRef.current = [];

    // Add new markers for each market point
    marketPoints.forEach((point, index) => {
      const marker = L.marker([point[0], point[1]], { 
        icon: defaultIcon,
        draggable: true
      })
        .bindPopup(`Market Point ${index + 1}`)
        .addTo(mapInstance.current!);

      marker.on('click', (e) => {
        // Handle marker click (e.g., for removal)
        if (e.originalEvent.ctrlKey && onMarketPointRemove) {
          onMarketPointRemove(index);
        }
      });

      marker.on('dragend', (e) => {
        const newPos = e.target.getLatLng();
        if (onMarketPointAdd && onMarketPointRemove) {
          onMarketPointRemove(index);
          onMarketPointAdd([newPos.lat, newPos.lng]);
        }
      });

      marketMarkersRef.current.push(marker);
    });

    // Draw polyline if we have at least 2 points
    if (marketPoints.length >= 2) {
      if (polylineRef.current) {
        polylineRef.current.setLatLngs(marketPoints);
      } else {
        polylineRef.current = L.polyline(marketPoints, { color: 'blue' })
          .addTo(mapInstance.current!);
      }
    } else if (polylineRef.current) {
      mapInstance.current?.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

  }, [marketPoints, isMarketMode]);

  // Handle map click events after initialization
  useEffect(() => {
    if (!mapInstance.current || !isInitialized) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      if (isMarketMode) {
        // Add new market point
        if (onMarketPointAdd) {
          onMarketPointAdd([lat, lng]);
        }
      } else {
        // Update single marker position
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon: defaultIcon })
            .addTo(mapInstance.current!);
        }
        
        // Notify parent component
        onLocationChange(lat, lng);
      }
    };

    mapInstance.current.on("click", handleMapClick);

    return () => {
      mapInstance.current?.off("click", handleMapClick);
    };
  }, [isInitialized, onLocationChange, isMarketMode, onMarketPointAdd]);

  // Update view when props change (for single marker mode)
  useEffect(() => {
    if (mapInstance.current && latitude && longitude && !isMarketMode) {
      mapInstance.current.setView([latitude, longitude]);
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], { icon: defaultIcon })
          .addTo(mapInstance.current);
      }
    }
  }, [latitude, longitude, isMarketMode]);

  return (
    <div
      ref={mapRef}
      style={{ height: "300px", width: "100%" }}
      className="rounded-md z-0"
    />
  );
};

export default LeafletMap;