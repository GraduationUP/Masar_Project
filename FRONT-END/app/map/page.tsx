"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "./loading";

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

interface Aid {
  name: string;
  coordinates: [Coordinates];
}

interface Market {
  name: string;
  coordinates: [Coordinates, Coordinates?, Coordinates?];
}

interface GasStation {
  name: string;
  coordinates: [Coordinates];
}

interface Store {
  name: string;
  coordinates: Coordinates;
}

export interface GazaData {
  city: string;
  aids: Aid[];
  markets: Market[];
  GasStations: GasStation[];
  stores: Store[];
}

export default function AdminMapPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [mapData, setMapData] = useState<GazaData>({
    city: "",
    aids: [],
    markets: [],
    GasStations: [],
    stores: [],
  });

  useEffect(() => {
    async function fetchStoresData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_BASE_URL}/api/admin/map`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const responseData = await response.json();
        setMapData(responseData);
      } catch (error) {
        console.error("Error fetching stores data:", error);
      }
    }
    fetchStoresData();
  }, []);

  if (!mapData) return <Loading />;
  return (
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
  );
}
