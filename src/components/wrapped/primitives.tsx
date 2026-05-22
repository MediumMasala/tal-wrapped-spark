import type { CSSProperties } from "react";

/** Stair-stepped extrusion: ~12 stacked rectangles offset diagonally. */
export function PixelStairs({
  width = 280,
  height = 120,
  color = "#FF6B6B",
  shadow = "#7A0010",
  steps = 12,
  step = 7,
  direction = "br",
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  shadow?: string;
  steps?: number;
  step?: number;
  direction?: "br" | "bl" | "tr" | "tl";
  style?: CSSProperties;
}) {
  const sx = direction.includes("r") ? 1 : -1;
  const sy = direction.startsWith("b") ? 1 : -1;
  const totalW = width + steps * step + 4;
  const totalH = height + steps * step + 4;
  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ shapeRendering: "crispEdges", ...style }}
    >
      {Array.from({ length: steps }).map((_, i) => {
        const t = i / (steps - 1);
        const ox = sx > 0 ? (steps - i) * step : i * step;
        const oy = sy > 0 ? (steps - i) * step : i * step;
        // gradient bright -> dark for shadow stack
        const r = Math.round(parseInt(shadow.slice(1, 3), 16) * (0.5 + t * 0.5));
        const g = Math.round(parseInt(shadow.slice(3, 5), 16) * (0.5 + t * 0.5));
        const b = Math.round(parseInt(shadow.slice(5, 7), 16) * (0.5 + t * 0.5));
        return (
          <rect
            key={i}
            x={ox}
            y={oy}
            width={width}
            height={height}
            fill={`rgb(${r},${g},${b})`}
          />
        );
      })}
      <rect
        x={sx > 0 ? 0 : steps * step}
        y={sy > 0 ? 0 : steps * step}
        width={width}
        height={height}
        fill={color}
      />
    </svg>
  );
}

/** Stair-stepped 3D giant text — used for "2025" so it bleeds the frame. */
export function StairText({
  text,
  color,
  shadow,
  layers = 12,
  step = 8,
  fontSize = "clamp(220px, 38vw, 460px)",
}: {
  text: string;
  color: string;
  shadow: string;
  layers?: number;
  step?: number;
  fontSize?: string;
}) {
  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
      {Array.from({ length: layers }).map((_, i) => {
        const o = (layers - i) * (step / 2);
        return (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              left: o,
              top: o,
              fontWeight: 900,
              fontFamily: "Inter, sans-serif",
              fontSize,
              letterSpacing: "-0.06em",
              color: shadow,
              opacity: 0.6 + (i / layers) * 0.4,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>
        );
      })}
      <div
        style={{
          position: "relative",
          fontWeight: 900,
          fontFamily: "Inter, sans-serif",
          fontSize,
          letterSpacing: "-0.06em",
          color,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export function CheckerboardBg({
  colorA = "#FFD700",
  colorB = "#9FE870",
  cell = 80,
}: {
  colorA?: string;
  colorB?: string;
  cell?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: colorA,
        backgroundImage: `
          linear-gradient(45deg, ${colorB} 25%, transparent 25%),
          linear-gradient(-45deg, ${colorB} 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${colorB} 75%),
          linear-gradient(-45deg, transparent 75%, ${colorB} 75%)`,
        backgroundSize: `${cell}px ${cell}px`,
        backgroundPosition: `0 0, 0 ${cell / 2}px, ${cell / 2}px -${cell / 2}px, -${cell / 2}px 0`,
      }}
    />
  );
}

/** Jagged comic-burst polygon. */
export function SpikyBurst({
  size = 360,
  spikes = 16,
  color = "#0A0A0A",
  innerRatio = 0.78,
  style,
}: {
  size?: number;
  spikes?: number;
  color?: string;
  innerRatio?: number;
  style?: CSSProperties;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size / 2;
  const inner = outer * innerRatio;
  const pts: string[] = [];
  const n = spikes * 2;
  for (let i = 0; i < n; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
      <polygon points={pts.join(" ")} fill={color} />
    </svg>
  );
}

/** Stair-stepped border around a rotated square (rhombus). */
export function PixelRhombusFrame({
  size = 280,
  color = "#B81D13",
  step = 6,
  steps = 8,
  style,
}: {
  size?: number;
  color?: string;
  step?: number;
  steps?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: "rotate(45deg)",
        ...style,
      }}
    >
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: -i * step,
            border: `${step}px solid ${color}`,
            opacity: 1 - i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

/** Stacked diagonal parallelograms with increasing opacity. */
export function StackedFan({
  count = 9,
  width = 320,
  height = 440,
  colorFrom = "#FFB800",
  colorTo = "#FF1B6B",
  skew = -18,
  offset = 18,
  style,
}: {
  count?: number;
  width?: number;
  height?: number;
  colorFrom?: string;
  colorTo?: string;
  skew?: number;
  offset?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: "relative", width, height, ...style }}>
      {Array.from({ length: count }).map((_, i) => {
        const t = i / count;
        const o = (i - count / 2) * offset;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${o}px, ${o * 0.6}px) skewX(${skew}deg)`,
              background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
              opacity: 0.15 + t * 0.65,
              borderRadius: 4,
              mixBlendMode: "screen",
            }}
          />
        );
      })}
    </div>
  );
}

/** Pixel stripe row (top/bottom decorative bars). */
export function PixelStripeRow({
  color = "#FF1B6B",
  alt = "#FFCC00",
  height = 18,
  unit = 18,
  style,
}: {
  color?: string;
  alt?: string;
  height?: number;
  unit?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        height,
        width: "100%",
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 ${unit}px, ${alt} ${unit}px ${unit * 2}px)`,
        ...style,
      }}
    />
  );
}