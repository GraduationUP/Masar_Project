"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Header from "@/components/main_layout/header";

// Dynamically import the map component to avoid SSR issues
const GazaMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <span className="sr-only">جار تحميل الخريطة...</span>
    </div>
  ),
});
interface Coordinates {
  [index: number]: number;
}

interface MapData {
  name: string;
  coordinates: [Coordinates];
}

interface MapData_Market {
  name: string;
  coordinates: [Coordinates, Coordinates?, Coordinates?];
}

export interface GazaData {
  city: string;
  aids: MapData[];
  market: MapData_Market[];
  gas_station: MapData[];
  stores: MapData[];
  restaurants: MapData[];
  car_services: MapData[];
  petrol_station: MapData[];
  internet: MapData[];
  delivery: MapData[];
}

export default function AdminMapPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [mapData, setMapData] = useState<GazaData>();

  useEffect(() => {
    async function fetchStoresData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/map-data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const responseData = await response.json();
        setMapData(responseData.services);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    }
    fetchStoresData();
  }, []);

  if (!mapData) return <Loading />;
  console.log("Map data received:", JSON.stringify(mapData, null, 2));

  return (
    <>
      <Header />
      <div className="container px-4 md:px-6 py-8 section-padding">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            خريطة الخدمات التفاعلية
          </h1>
          <p className="text-muted-foreground text-lg">
            استكشف الخدمات والمتاجر في محيطك
          </p>
        </div>
        <GazaMap data={mapData} />
      </div>
    </>
  );
}
