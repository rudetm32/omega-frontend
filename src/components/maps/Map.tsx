"use client";

import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  realPosition: [number, number];
  simulatedPositions: [number, number][];
}

const Map: React.FC<MapProps> = ({ realPosition, simulatedPositions }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const L = require("leaflet");
    const mapContainer = L.DomUtil.get("map");

    if (mapContainer != null) {
      (mapContainer as any)._leaflet_id = null;
    }

    const map = L.map("map").setView(realPosition, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Añadir marcador para la posición real
    L.marker(realPosition, { icon: getCustomIcon(L) })
      .addTo(map)
      .bindPopup("Ubicación actual")
      .openPopup();

    // Añadir marcadores para las posiciones simuladas
    simulatedPositions.forEach((position) => {
      L.marker(position, { icon: getCustomIcon(L) })
        .addTo(map)
        .bindPopup("Ubicación simulada");
    });

    return () => {
      map.remove();
    };
  }, [realPosition, simulatedPositions]);

  const getCustomIcon = (L: any) =>
    L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [15, 25],
      iconAnchor: [12, 50],
      popupAnchor: [0, -55],
    });

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default Map;
