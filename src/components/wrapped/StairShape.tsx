import { motion } from "framer-motion";

/**
 * Stair-stepped 3D extruded rectangle, built from layered SVG rects offset
 * diagonally to fake pixelated edges (Wrapped 2024 visual quote).
 */
export function StairBlock({
  width = 200,
  height = 80,
  color = "#FF6B35",
  edgeColor = "#CC3D0E",
  steps = 10,
  step = 4,
  className = "",
}: {
  width?: number;
  height?: number;
  color?: string;
  edgeColor?: string;
  steps?: number;
  step?: number;
  className?: string;
}) {
  const totalW = width + steps * step;
  const totalH = height + steps * step;
  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      className={className}
      style={{ shapeRendering: "crispEdges" }}
    >
      {Array.from({ length: steps }).map((_, i) => {
        const o = (steps - i) * step;
        return (
          <rect
            key={i}
            x={o}
            y={o}
            width={width}
            height={height}
            fill={edgeColor}
            opacity={0.6 + (i / steps) * 0.4}
          />
        );
      })}
      <rect x={0} y={0} width={width} height={height} fill={color} />
    </svg>
  );
}

/** Stacked parallelogram fan. */
export function ParallelogramFan({
  count = 9,
  width = 280,
  height = 380,
  className = "",
  rotateBase = -18,
}: {
  count?: number;
  width?: number;
  height?: number;
  className?: string;
  rotateBase?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ width, height, position: "relative" }}
      animate={{ rotate: [rotateBase - 2, rotateBase + 2, rotateBase - 2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const offset = (i - count / 2) * 14;
        const opacity = 0.18 + (i / count) * 0.7;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${offset}px, ${offset * 0.6}px) skewX(-18deg)`,
              background: `linear-gradient(135deg, #FFB800 0%, #FF6B35 60%, #CC3D0E 100%)`,
              opacity,
              borderRadius: 6,
              border: "1px solid rgba(255,244,230,0.15)",
            }}
          />
        );
      })}
    </motion.div>
  );
}