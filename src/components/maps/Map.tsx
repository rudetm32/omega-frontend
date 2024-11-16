"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CustomIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [15, 25],
  iconAnchor: [12, 50],
  popupAnchor: [0, -55],
});

L.Marker.prototype.options.icon = CustomIcon;

interface MapComponentProps {
  realPosition: [number, number];
  simulatedPositions: Array<[number, number]>;
}

const Map: React.FC<MapComponentProps> = ({ realPosition, simulatedPositions }) => {
  const [position, setPosition] = useState<[number, number]>(realPosition);

  useEffect(() => {
    if (realPosition) {
      setPosition(realPosition);
    }
  }, [realPosition]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-full max-w-3xl mx-auto">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={realPosition} icon={CustomIcon}>
          <Popup className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
            <div className="text-lg font-semibold">Ubicación Real</div>
            <div className="text-sm">
              Posición: {realPosition[0].toFixed(2)}, {realPosition[1].toFixed(2)}
            </div>
            <a href="#" className="text-blue-500 hover:underline">
              Más información
            </a>
          </Popup>
        </Marker>

        {simulatedPositions.map((position, index) => (
          <Marker key={index} position={position} icon={CustomIcon}>
            <Popup className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
              <div className="text-lg font-semibold">Ubicación Simulada {index + 1}</div>
              <div className="text-sm">
                Posición: {position[0].toFixed(2)}, {position[1].toFixed(2)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
