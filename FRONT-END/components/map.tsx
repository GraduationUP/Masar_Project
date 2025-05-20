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


// Define your types here
type Coordinate = [number, number];

interface Store {
    name: string;
    coordinates: Coordinate;
}

interface Market {
    name: string;
    coordinates: Coordinate[];
}

interface GasStation {
    name: string;
    coordinates: Coordinate;
}

interface MapData {
    city: string;
    stores: Store[];
    markets: Market[];
    GasStations: GasStation[];
}

interface ZoomToLocationProps {
    zoomLocation: string;
}

// Fix for default marker icons in Leaflet
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

const GazaMap: React.FC = () => {
    const [data, setData] = useState<MapData | null>(null);
    const [viewOption, setViewOption] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [zoomLocation, setZoomLocation] = useState<string>("31.5069,34.4560"); // Default to Gaza

    // Load JSON data
    useEffect(() => {
        fetch("/mapData.json")
            .then((response) => response.json())
            .then((data: MapData) => {
                // Explicitly type the data here as well
                setData(data);
            })
            .catch((error) => console.error("Error loading JSON:", error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Filtered data based on search term, ignoring case
    const filteredStores = data.stores.filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredMarkets = data.markets.filter((market) =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredGasStations = data.GasStations.filter((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "50%" }}
            />
            <select
                value={viewOption}
                onChange={(e) => setViewOption(e.target.value)}
            >
                <option value="all">الكل</option>
                <option value="stores">مخازن</option>
                <option value="markets">اسواق</option>
                <option value="GasStations">نقط غاز</option>
            </select>

            <select
                value={zoomLocation}
                onChange={(e) => setZoomLocation(e.target.value)}
            >
                <option value="31.5069,34.4560">غزة</option>
                <option value="31.2725,34.2586">رفح</option>
                <option value="31.3444,34.3031">خانيونس</option>
                <option value="31.5281,34.4831">جباليا</option>
                <option value="31.5500,34.5000">بيت لاهيا</option>
                <option value="31.4189,34.3517">دير البلح</option>
            </select>

            <MapContainer
                center={[31.5017, 34.4669]}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomToLocation zoomLocation={zoomLocation} />

                {(viewOption === "all" || viewOption === "stores") &&
                    filteredStores.map((store, index) => (
                        <Marker
                            key={`store-${index}`}
                            position={store.coordinates as Coordinate}
                        >
                            {" "}
                            {/* Explicit type assertion */}
                            <Popup>
                                <b>{store.name}</b>
                            </Popup>
                        </Marker>
                    ))}

                {(viewOption === "all" || viewOption === "markets") &&
                    filteredMarkets.map((market, index) => (
                        <React.Fragment key={`market-${index}`}>
                            <Polyline
                                positions={market.coordinates}
                                color="blue"
                                weight={3}
                                opacity={0.7}
                            />
                            <Marker
                                position={getCenter(market.coordinates)}
                                icon={L.divIcon({
                                    className: "custom-label",
                                    html: `<div>${market.name}</div>`,
                                    iconSize: [100, 20],
                                })}
                            />
                        </React.Fragment>
                    ))}

                {(viewOption === 'all' || viewOption === 'GasStations') && filteredGasStations.map((station, index) => (
                    <Marker
                        key={`gas-${index}`}
                        position={station.coordinates as Coordinate}
                        icon={GasIcon}
                    >
                        <Popup>
                            <div style={{ textAlign: 'right' }}>
                                <h3 style={{ margin: 0 }}>{station.name}</h3>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

const ZoomToLocation: React.FC<ZoomToLocationProps> = ({ zoomLocation }) => {
    const map = useMap();
    useEffect(() => {
        const [latitude, longitude] = zoomLocation.split(",").map(Number);
        const locationLatLng = L.latLng(latitude, longitude);
        map.setView(locationLatLng, 13);
    }, [zoomLocation, map]);

    return null;
};

// Function to calculate the center of a set of coordinates
const getCenter = (coordinates: Coordinate[]) => {
    const latSum = coordinates.reduce((sum, coord) => sum + coord[0], 0);
    const lngSum = coordinates.reduce((sum, coord) => sum + coord[1], 0);
    return [latSum / coordinates.length, lngSum / coordinates.length] as [number, number];

};

export default GazaMap;