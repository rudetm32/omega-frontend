"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CustomIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [15, 25], // Tamaño del icono
  iconAnchor: [12, 50], // Punto de anclaje del icono
  popupAnchor: [0, -55], // Ajusta el popup para que aparezca justo arriba del marcador
});

// Asignamos el icono a los marcadores
L.Marker.prototype.options.icon = CustomIcon;

interface MapComponentProps {
  realPosition: [number, number]; // Ubicación actual
  simulatedPositions: Array<[number, number]>; // Ubicaciones simuladas
}

const Map: React.FC<MapComponentProps> = ({ realPosition, simulatedPositions }) => {
  const [position, setPosition] = useState<[number, number]>(realPosition);

  // Efecto para asegurar que la posición se actualice correctamente
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
        style={{ height: "400px", width: "100%" }} // Tamaño más pequeño para el mapa
      >
        {/* Cargamos el tile layer de OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcador para la ubicación real */}
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

        {/* Marcadores para las ubicaciones simuladas */}
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
