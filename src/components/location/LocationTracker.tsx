"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapComponent = dynamic(() => import("../maps/Map"), { ssr: false });

const LocationTracker: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [simulatedLocations, setSimulatedLocations] = useState<
    { latitude: number; longitude: number; isReal: boolean }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let L: any;

    if (typeof window !== "undefined") {
      L = require("leaflet");
    }

    const generateRandomLocations = (latitude: number, longitude: number, count: number) => {
      const locations: { latitude: number; longitude: number; isReal: boolean }[] = [];
      for (let i = 0; i < count; i++) {
        const randomOffsetLat = (Math.random() - 0.5) * 0.05;
        const randomOffsetLng = (Math.random() - 0.5) * 0.05;
        locations.push({
          latitude: latitude + randomOffsetLat,
          longitude: longitude + randomOffsetLng,
          isReal: false,
        });
      }
      return locations;
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);

          const simulatedLocations = generateRandomLocations(latitude, longitude, 5);
          setSimulatedLocations(simulatedLocations);
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
          setError("No se pudo obtener la ubicación.");
        }
      );
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!position) {
    return <div>Cargando ubicación...</div>;
  }

  const simulatedPositions = simulatedLocations.map(
    (location) => [location.latitude, location.longitude] as [number, number]
  );

  return (
    <div>
      <h3>Ubicación actual</h3>
      {/* <p>Latitud: {position[0]}</p>
      <p>Longitud: {position[1]}</p> */}

      <MapComponent realPosition={position} simulatedPositions={simulatedPositions} />
    </div>
  );
};

export default LocationTracker;
