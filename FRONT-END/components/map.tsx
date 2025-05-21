"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Store, ShoppingBag, Fuel, AmbulanceIcon as FirstAid, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Fix Leaflet icon issues
const createIcon = (color: string, Icon: any) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); border: 2px solid white; transition: all 0.3s ease;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">${
        Icon === Store
          ? '<path d="M2 3h19v11h-19z"></path><path d="M11 3v11"></path><path d="M2 8h19"></path><path d="M19 21l-7-5-7 5V3h14v18z"></path>'
          : Icon === ShoppingBag
            ? '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>'
            : Icon === Fuel
              ? '<path d="M3 22V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14"></path><path d="M3 10h18"></path><path d="M12 2v8"></path><path d="M8 4h8"></path>'
              : Icon === FirstAid
                ? '<path d="M9 12h6"></path><path d="M12 9v6"></path><path d="M5.5 8.5 9 12l-3.5 3.5"></path><path d="M18.5 8.5 15 12l3.5 3.5"></path>'
                : '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
      }</svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

// Map marker types
const markerIcons = {
  store: createIcon("#4f46e5", Store),
  shop: createIcon("#4f46e5", ShoppingBag),
  gas: createIcon("#f59e0b", Fuel),
  medical: createIcon("#10b981", FirstAid),
  emergency: createIcon("#ef4444", AlertTriangle),
  default: createIcon("#6b7280", Store),
}

type MarkerType = "store" | "shop" | "gas" | "medical" | "emergency" | "default"

interface MapMarker {
  position: [number, number]
  title: string
  type: MarkerType
  id?: string
}

interface MapProps {
  center: [number, number]
  zoom: number
  markers?: MapMarker[]
  interactive?: boolean
  showUserLocation?: boolean
}

// Component to recenter map when center prop changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default function Map({ center, zoom, markers = [], interactive = true, showUserLocation = false }: MapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (showUserLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error getting user location:", error)
        },
      )
    }
  }, [showUserLocation])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={interactive}
      zoomControl={interactive}
      dragging={interactive}
      touchZoom={interactive}
      doubleClickZoom={interactive}
      className="h-full w-full rounded-lg shadow-md"
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={markerIcons[marker.type] || markerIcons.default}>
          <Popup className="rounded-lg overflow-hidden shadow-lg">
            <div className="p-2">
              <h3 className="font-medium text-lg">{marker.title}</h3>
              {/* <Badge className="mt-1 mb-2" variant={marker.type === "emergency" ? "destructive" : "default"}>
                {marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}
              </Badge> */}
              {marker.id && (
                <Button asChild size="sm" className="w-full mt-2 rounded-md">
                  <Link href={`/stores/${marker.id}`}>View Details</Link>
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <>
          <Marker
            position={userLocation}
            icon={L.divIcon({
              className: "user-location-icon",
              html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #3b82f6, 0 0 10px rgba(59, 130, 246, 0.5); animation: pulse 1.5s infinite;"></div>
              <style>
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.2); opacity: 0.8; }
                  100% { transform: scale(1); opacity: 1; }
                }
              </style>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">Your Location</h3>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={userLocation}
            radius={500}
            pathOptions={{
              color: "#3b82f6",
              fillColor: "#3b82f6",
              fillOpacity: 0.1,
              weight: 2,
              dashArray: "5, 5",
            }}
          />
        </>
      )}
    </MapContainer>
  )
}
