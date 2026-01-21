"use client";

import { useEffect, useMemo, useState } from "react";

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

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;

const landDots = [
  [-130, 50], [-120, 45], [-110, 40], [-100, 35], [-90, 30], [-80, 25], [-70, 20], [-100, 20], [-120, 30],
  [-80, 5], [-75, -10], [-70, -25], [-65, -40], [-60, -50],
  [-10, 55], [0, 50], [10, 55], [20, 50], [30, 55], [10, 40], [20, 35], [30, 40],
  [10, 10], [0, 0], [10, -10], [20, -20], [30, -30], [20, -35], [10, -30], [5, -20],
  [50, 55], [60, 50], [70, 45], [80, 40], [90, 35], [100, 30], [110, 25], [120, 30], [130, 40], [140, 45],
  [70, 20], [80, 15], [90, 10], [100, 5], [110, 0], [120, -10], [130, -20], [120, -30],
  [135, -25], [145, -35], [150, -25], [155, -15],
  [-160, 60], [-40, 65], [40, 65],
];

const gridLats = [-60, -30, 0, 30, 60];
const gridLngs = [-150, -90, -30, 30, 90, 150];

const project = ([lng, lat]) => {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return [x, y];
};

const buildArc = (from, to) => {
  const [sx, sy] = project(from);
  const [tx, ty] = project(to);
  const dx = tx - sx;
  const dy = ty - sy;
  const mx = sx + dx * 0.5;
  const my = sy + dy * 0.5;
  const curvature = 0.35;
  const cx = mx - dy * curvature;
  const cy = my + dx * curvature;
  return `M ${sx} ${sy} Q ${cx} ${cy} ${tx} ${ty}`;
};

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
  const landPoints = useMemo(() => landDots.map(project), []);

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,116,144,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="relative h-full w-full"
          role="img"
          aria-label="Simulated global threat activity map"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#mapGlow)" />

          <g opacity="0.4">
            {gridLats.map((lat) => {
              const [, y] = project([0, lat]);
              return (
                <line
                  key={`lat-${lat}`}
                  x1="0"
                  x2={MAP_WIDTH}
                  y1={y}
                  y2={y}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
              );
            })}
            {gridLngs.map((lng) => {
              const [x] = project([lng, 0]);
              return (
                <line
                  key={`lng-${lng}`}
                  x1={x}
                  x2={x}
                  y1="0"
                  y2={MAP_HEIGHT}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
              );
            })}
          </g>

          <g opacity="0.7">
            {landPoints.map(([x, y], index) => (
              <circle key={`land-${index}`} cx={x} cy={y} r="2" fill="#1e293b" />
            ))}
          </g>

          <g opacity="0.9">
            {attacks.map((attack, index) => {
              const [sx, sy] = project(attack.source);
              const [tx, ty] = project(attack.destination);
              const path = buildArc(attack.source, attack.destination);
              const color = getColor(attack.type);
              return (
                <g key={`${attack.type}-${index}`}>
                  <path
                    d={path}
                    stroke={color}
                    strokeWidth="1.6"
                    strokeOpacity="0.7"
                    strokeDasharray="6 10"
                    fill="none"
                  />
                  <circle
                    cx={sx}
                    cy={sy}
                    r="2.4"
                    fill={color}
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  />
                  <circle cx={tx} cy={ty} r="2" fill={color} opacity="0.75" />
                </g>
              );
            })}
          </g>
        </svg>
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
