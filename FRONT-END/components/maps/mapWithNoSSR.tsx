import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});


interface MarkerProps {
  position: [number, number];
  title: string;
  type?: string; // You can expand on this if you have different marker types
}

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerProps[];
}

const MapWithNoSSR: React.FC<MapProps> = ({ center, zoom, markers }) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            {marker.title}
            {marker.type && <br />}
            {marker.type && <strong>Type: {marker.type}</strong>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithNoSSR;