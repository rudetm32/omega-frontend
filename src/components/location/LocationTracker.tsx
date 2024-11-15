"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CustomIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [15, 25], // Tamaño del icono
  iconAnchor: [12, 50], // Punto de anclaje del icono
  popupAnchor: [0, -55], // Ajusta el popup para que aparezca justo arriba del marcador
});

const MapComponent = dynamic(() => import('../maps/Map'), { ssr: false });

const LocationTracker: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [simulatedLocations, setSimulatedLocations] = useState<
    { latitude: number; longitude: number; isReal: boolean }[]
  >([]);

  // Simulamos las ubicaciones
  const generateRandomLocations = (latitude: number, longitude: number, count: number) => {
    const locations: { latitude: number; longitude: number; isReal: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const randomOffsetLat = (Math.random() - 0.5) * 0.05; // Rango de latitud aleatorio
      const randomOffsetLng = (Math.random() - 0.5) * 0.05; // Rango de longitud aleatorio

      locations.push({
        latitude: latitude + randomOffsetLat,
        longitude: longitude + randomOffsetLng,
        isReal: false, // Flag de simulación
      });
    }
    return locations;
  };

  // Acceder a la geolocalización del navegador
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);

          // Generar las ubicaciones simuladas (5 en este caso)
          const simulatedLocations = generateRandomLocations(latitude, longitude, 5);
          setSimulatedLocations(simulatedLocations);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    }
  }, []); // Ejecutamos solo una vez cuando el componente se monte

  // Renderizamos el mapa solo si la ubicación está disponible
  if (!position) {
    return <div>Loading location...</div>;
  }

  return (
    <div>
      <h2>Ubicación actual</h2>
      <p>Latitud: {position[0]}</p>
      <p>Longitud: {position[1]}</p>

      {/* Componente de Mapa */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }} // Tamaño del mapa
      >
        {/* Cargamos el tile layer de OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Ubicación Real */}
        <Marker position={position} icon={CustomIcon}>
          <Popup className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
            <div className="text-lg font-semibold">Ubicación Real</div>
            <div className="text-sm">Posición: {position[0].toFixed(2)}, {position[1].toFixed(2)}</div>
          </Popup>
        </Marker>

        {/* Ubicaciones Simuladas */}
        {simulatedLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={CustomIcon}
          >
            <Popup className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
              <div className="text-lg font-semibold">Ubicación Simulada</div>
              <div className="text-sm">
                Posición: {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationTracker;
