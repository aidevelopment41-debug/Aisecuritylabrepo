"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const attackTypes = [
  "prompt-injection",
  "data-leakage",
  "model-evasion",
  "model-theft",
];

const getColor = (type) => {
  switch (type) {
    case "prompt-injection":
      return "#f97316";
    case "data-leakage":
      return "#3b82f6";
    case "model-evasion":
      return "#10b981";
    case "model-theft":
      return "#8b5cf6";
    default:
      return "#f97316";
  }
};

const formatAttackType = (type) =>
  type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const generateAttack = () => {
  const srcLng = Math.random() * 360 - 180;
  const srcLat = Math.random() * 180 - 90;
  const dstLng = Math.random() * 360 - 180;
  const dstLat = Math.random() * 180 - 90;
  const type = attackTypes[Math.floor(Math.random() * attackTypes.length)];

  return {
    source: [srcLng, srcLat],
    destination: [dstLng, dstLat],
    type,
  };
};

export function ThreatMap() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const newAttacks = Array.from({ length: 15 }, generateAttack);
    setAttacks(newAttacks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttacks((prev) => {
        const oldAttacks = prev.slice(0, 5);
        const newAttacks = Array.from({ length: 10 }, generateAttack);
        return [...oldAttacks, ...newAttacks];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative h-[300px] md:h-[500px] w-full rounded-lg border border-cyan-500/30 bg-gray-900 p-4">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: [0, 20],
          }}
          className="h-full w-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
          {attacks.map((attack, index) => (
            <Line
              key={`${attack.type}-${index}`}
              from={attack.source}
              to={attack.destination}
              stroke={getColor(attack.type)}
              strokeWidth={1}
              strokeLinecap="round"
            />
          ))}
        </ComposableMap>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {attackTypes.map((type) => (
          <div key={type} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getColor(type) }}
            />
            <span className="text-sm text-gray-300">{formatAttackType(type)}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 text-sm mt-2">
        Simulated data for demonstration purposes.
      </p>
    </div>
  );
}

export default ThreatMap;
