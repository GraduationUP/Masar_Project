"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Label } from "./ui/label";
import classes from "./map.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  id: number;
  name: string;
  status: boolean; // Corrected typo here
  coordinates: Coordinates;
}

export interface GazaData {
  city: string;
  aids: Aid[];
  markets: Market[];
  GasStations: GasStation[];
  stores: Store[];
}

interface GazaMapProps {
  data: GazaData;
}

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// Create custom icon for gas stations
const GasIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF9800"><path d="M12.8324 21.8013C15.9583 21.1747 20 18.926 20 13.1112C20 7.8196 16.1267 4.29593 13.3415 2.67685C12.7235 2.31757 12 2.79006 12 3.50492V5.3334C12 6.77526 11.3938 9.40711 9.70932 10.5018C8.84932 11.0607 7.92052 10.2242 7.816 9.20388L7.73017 8.36604C7.6304 7.39203 6.63841 6.80075 5.85996 7.3946C4.46147 8.46144 3 10.3296 3 13.1112C3 20.2223 8.28889 22.0001 10.9333 22.0001C11.0871 22.0001 11.2488 21.9955 11.4171 21.9858C10.1113 21.8742 8 21.064 8 18.4442C8 16.3949 9.49507 15.0085 10.631 14.3346C10.9365 14.1533 11.2941 14.3887 11.2941 14.7439V15.3331C11.2941 15.784 11.4685 16.4889 11.8836 16.9714C12.3534 17.5174 13.0429 16.9454 13.0985 16.2273C13.1161 16.0008 13.3439 15.8564 13.5401 15.9711C14.1814 16.3459 15 17.1465 15 18.4442C15 20.4922 13.871 21.4343 12.8324 21.8013Z"/></svg>',
  iconSize: [40, 80],
  iconAnchor: [20, 80],
  popupAnchor: [1, -40],
  shadowSize: [80, 80],
  className: "gas-station-icon",
});

// Create custom icons for stores
const ActiveStoreIcon = new L.Icon({
  iconUrl: "/images/active_store.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const GazaMap: React.FC<GazaMapProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read the category from the URL on initial load
  const initialCategory = searchParams.get("category") || "all";

  const [viewOption, setViewOption] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomLocation, setZoomLocation] = useState("31.5069,34.4560");

  useEffect(() => {
    // This effect now correctly gets the category from the URL whenever it changes
    const currentCategory = searchParams.get("category") || "all";
    if (currentCategory !== viewOption) {
      setViewOption(currentCategory);
    }
  }, [searchParams, viewOption]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setViewOption(selectedCategory);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (selectedCategory === "all") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", selectedCategory);
    }
    // Update the URL without reloading the page
    router.push(`?${newSearchParams.toString()}`);
  };

  const filteredAids = data.aids.filter(
    (aid: { name: string }) =>
      viewOption === "all" ||
      (viewOption === "aids" &&
        aid.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredMarkets = data.markets.filter(
    (market: { name: string }) =>
      viewOption === "all" ||
      (viewOption === "markets" &&
        market.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGasStations = data.GasStations.filter(
    (station: { name: string }) =>
      viewOption === "all" ||
      (viewOption === "GasStations" &&
        station.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredStores = data.stores.filter(
    (store: { name: string }) =>
      viewOption === "all" ||
      (viewOption === "stores" &&
        store.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <div>
      {/* TODO: Add the stores */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>اعثر على الخدمة التي تحتاجها</CardTitle>{" "}
          <CardDescription>استكشف المتاجر والخدمات بالقرب منك</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap w-full">
            <div className="w-full sm:w-1/2 p-2">
              <Label htmlFor="category">القسم</Label>{" "}
              <select
                id="category"
                value={viewOption}
                onChange={handleFilterChange}
                className="w-full border border-border/50 rounded-md p-2"
              >
                <option value="all">الكل</option>
                <option value="aids">مخازن</option>
                <option value="markets">اسواق</option>
                <option value="GasStations">نقط غاز</option>
                <option value="stores">متاجر</option>
              </select>
            </div>

            <div className="w-full sm:w-1/2 p-2">
              <Label htmlFor="location">الموقع</Label>

              <select
                id="location"
                value={zoomLocation}
                onChange={(e) => setZoomLocation(e.target.value)}
                className="w-full border border-border/50 rounded-md p-2"
              >
                <option value="31.5069,34.4560">غزة</option>
                <option value="31.2725,34.2586">رفح</option>
                <option value="31.3444,34.3031">خانيونس</option>
                <option value="31.5281,34.4831">جباليا</option>
                <option value="31.5500,34.5000">بيت لاهيا</option>
                <option value="31.4189,34.3517">دير البلح</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <MapContainer
        center={[31.5017, 34.4669]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomToLocation
          zoomLocation={zoomLocation}
          length={0}
          coordinates={[1, 1]}
        />

        {(viewOption === "all" || viewOption === "aids") &&
          filteredAids.map(
            (
              aid: {
                coordinates: unknown;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: any
            ) => (
              <Marker
                key={`aid-${index}`}
                position={aid.coordinates[0] as [number, number]}
              >
                <Popup>
                  <b>{aid.name}</b>
                </Popup>
              </Marker>
            )
          )}

        {(viewOption === "all" || viewOption === "markets") &&
          filteredMarkets.map(
            (
              market: { coordinates: Props | L.LatLngExpression[]; name: any },
              index: any
            ) => (
              <React.Fragment key={`market-${index}`}>
                <Polyline
                  positions={market.coordinates as L.LatLngExpression[]}
                  color="blue"
                  weight={3}
                  opacity={0.7}
                />

                <Marker
                  position={getCenter(market.coordinates as number[][])}
                  icon={L.divIcon({
                    className: classes.custom_label,
                    html: `<div>${market.name}</div>`,
                    iconSize: [100, 20],
                  })}
                />
              </React.Fragment>
            )
          )}

        {(viewOption === "all" || viewOption === "GasStations") &&
          filteredGasStations.map(
            (
              station: {
                coordinates: unknown;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: any
            ) => (
              <Marker
                key={`gas-${index}`}
                position={station.coordinates[0] as [number, number]}
                icon={GasIcon}
              >
                <Popup>
                  <div style={{ textAlign: "right" }}>
                    <h3 style={{ margin: 0 }}>{station.name}</h3>{" "}
                  </div>
                </Popup>
              </Marker>
            )
          )}

        {(viewOption === "all" || viewOption === "stores") &&
          filteredStores.map(
            (store: {
              id: number;
              name: string;
              status: boolean;
              coordinates: Coordinates;
            }) => (
              <Marker
                key={`store-${store.id}`}
                position={[
                  store.coordinates[0] as number,
                  store.coordinates[1] as number,
                ]}
                icon={ActiveStoreIcon}
              >
                <Popup>
                  <Link href={`/store/${store.id}`}>
                    <div>{store.name}</div>
                  </Link>
                </Popup>
              </Marker>
            )
          )}
      </MapContainer>
    </div>
  );
};

const ZoomToLocation: React.FC<Props> = ({ zoomLocation }) => {
  const map = useMap();
  useEffect(() => {
    const [latitude, longitude] = zoomLocation.split(",").map(Number);
    const locationLatLng = L.latLng(latitude, longitude);
    map.setView(locationLatLng, 13);
  }, [zoomLocation, map]);
  return null;
};

// Function to calculate the center of a set of coordinates
const getCenter = (coordinates: number[][]): [number, number] => {
  const latSum = coordinates.reduce((sum, coord) => sum + coord[0], 0);
  const lngSum = coordinates.reduce((sum, coord) => sum + coord[1], 0);
  return [latSum / coordinates.length, lngSum / coordinates.length];
};

export default GazaMap;
