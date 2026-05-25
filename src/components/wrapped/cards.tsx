import { motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";
import { wrappedConfig } from "@/config/stats";

/* ============================================================
 *  Wrapped — Spotify-style poppy deck
 *  Per-slide vivid backgrounds · oversized display type ·
 *  animated blobs & squiggles · spring physics.
 * ============================================================ */

const spring: Transition = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };
const springSoft: Transition = { type: "spring", stiffness: 80, damping: 22 };

const PAL = {
  coral: "#FF5A4E",
  lime: "#B7F84C",
  lilac: "#C8B6FF",
  cream: "#F5E9D4",
  hotpink: "#FF3D8B",
  electric: "#4D6CFF",
  mustard: "#FFC542",
  ink: "#0E0E10",
  light: "#FAFAF7",
};

type Theme = { bg: string; ink: string; accent: string; blob: string };
const T = {
  coral:    { bg: PAL.coral,    ink: PAL.ink,   accent: PAL.ink,      blob: PAL.hotpink } satisfies Theme,
  lime:     { bg: PAL.lime,     ink: PAL.ink,   accent: PAL.hotpink,  blob: PAL.electric } satisfies Theme,
  lilac:    { bg: PAL.lilac,    ink: PAL.ink,   accent: PAL.electric, blob: PAL.coral } satisfies Theme,
  cream:    { bg: PAL.cream,    ink: PAL.ink,   accent: PAL.coral,    blob: PAL.mustard } satisfies Theme,
  hotpink:  { bg: PAL.hotpink,  ink: PAL.light, accent: PAL.lime,     blob: PAL.mustard } satisfies Theme,
  electric: { bg: PAL.electric, ink: PAL.light, accent: PAL.mustard,  blob: PAL.hotpink } satisfies Theme,
  mustard:  { bg: PAL.mustard,  ink: PAL.ink,   accent: PAL.electric, blob: PAL.coral } satisfies Theme,
  ink:      { bg: PAL.ink,      ink: PAL.light, accent: PAL.lime,     blob: PAL.coral } satisfies Theme,
};

/* ───────────── Primitives ───────────── */

function Shell({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return (
    <div
      className="wrapped-deck w-grain"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: theme.bg,
        color: theme.ink,
        containerType: "inline-size",
      }}
    >
      {children}
    </div>
  );
}

function Blob({
  color, size = 320, x = "60%", y = "10%", delay = 0, opacity = 0.7,
}: { color: string; size?: number; x?: string; y?: string; delay?: number; opacity?: number }) {
  return (
    <motion.div
      aria-hidden
      className="w-blob"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ ...springSoft, delay }}
      style={{
        position: "absolute",
        left: x, top: y,
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        mixBlendMode: "multiply",
        animationDelay: `${delay}s`,
        pointerEvents: "none",
      }}
    />
  );
}

function Squiggle({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <motion.path
        d="M0 50 Q 50 0 100 50 T 200 50 T 300 50 T 400 50"
        stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

function Pill({ children, bg, fg }: { children: React.ReactNode; bg: string; fg: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={spring}
      className="w-mono"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 12px", borderRadius: 999,
        background: bg, color: fg,
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.14em", textTransform: "uppercase",
      }}
    >
      <span className="w-pulse-dot"
        style={{ width: 6, height: 6, borderRadius: 999, background: fg }} />
      {children}
    </motion.span>
  );
}

function DeckMark({ theme }: { theme: Theme }) {
  return (
    <div
      className="w-kicker"
      style={{
        position: "absolute", top: 22, left: 22,
        display: "flex", alignItems: "center", gap: 8,
        color: theme.ink, opacity: 0.85, zIndex: 2,
      }}
    >
      <span style={{
        width: 12, height: 12, borderRadius: 999,
        background: theme.accent, display: "inline-block",
      }} />
      {wrappedConfig.companyName} · Wrapped {wrappedConfig.year}
    </div>
  );
}

function PageNo({ n, theme, of = 10 }: { n: number; theme: Theme; of?: number }) {
  return (
    <div className="w-mono"
      style={{
        position: "absolute", bottom: 18, right: 22,
        color: theme.ink, opacity: 0.55,
        fontSize: 11, letterSpacing: "0.1em", zIndex: 2,
      }}>
      {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")}
    </div>
  );
}

/* ============================================================
 * CARD 1 — Title cover (coral)
 * ============================================================ */
export function Card1({ name }: { name: string }) {
  const theme = T.coral;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={380} x="-30%" y="-15%" delay={0.1} opacity={0.85} />
      <Blob color={PAL.mustard} size={260} x="65%" y="58%" delay={0.25} opacity={0.8} />
      <DeckMark theme={theme} />
      <PageNo n={1} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 70 }}>
        <Pill bg={theme.ink} fg={theme.bg}>Annual review · 365 days</Pill>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: "30%" }}>
        <motion.h1
          className="w-display"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            margin: 0,
            fontSize: "clamp(48px, 15cqw, 68px)",
            color: theme.ink,
          }}
        >
          Hey<br />
          <span style={{
            background: theme.ink, color: theme.bg,
            padding: "0 12px 4px", display: "inline-block",
            borderRadius: 6, marginTop: 6,
            maxWidth: "100%",
          }}>{name},</span><br />
          your year<br />
          is wrapped.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            marginTop: 22, fontSize: 15, lineHeight: 1.5,
            color: theme.ink, opacity: 0.8, maxWidth: 280, fontWeight: 500,
          }}
        >
          {wrappedConfig.companyName} in 9 chapters. Tap to begin.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.9 }}
        style={{
          position: "absolute", bottom: 56, left: 24,
          display: "flex", alignItems: "center", gap: 10,
          color: theme.ink, fontWeight: 600, fontSize: 14,
        }}
      >
        <span>Tap to begin</span>
        <span className="w-caret">▶</span>
      </motion.div>
    </Shell>
  );
}

/* ============================================================
 * CARD FIRECRACKER — MAU reveal (ink → explodes confetti)
 * ============================================================ */
export function CardFirecracker() {
  const fc = wrappedConfig.firecracker;
  const theme = T.ink;
  const colors = [PAL.coral, PAL.lime, PAL.hotpink, PAL.mustard, PAL.lilac, PAL.electric];
  const confetti = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    angle: (i / 28) * Math.PI * 2,
    dist: 180 + Math.random() * 120,
    color: colors[i % colors.length],
    size: 8 + Math.random() * 10,
    delay: 1.0 + Math.random() * 0.3,
  }));

  return (
    <Shell theme={theme}>
      <DeckMark theme={theme} />
      <PageNo n={2} theme={theme} />

      {/* Ascending rocket trail */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: ["0vh", "50vh"], opacity: [0, 1] }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={{
          position: "absolute", left: "50%", bottom: "45%",
          width: 2, marginLeft: -1,
          background: `linear-gradient(to top, transparent, ${PAL.mustard})`,
        }}
      />

      {/* Confetti burst */}
      <div style={{ position: "absolute", left: "50%", top: "45%", width: 0, height: 0 }}>
        {confetti.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: Math.cos(p.angle) * p.dist,
              y: Math.sin(p.angle) * p.dist,
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{ duration: 1.6, delay: p.delay, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              position: "absolute",
              width: p.size, height: p.size,
              marginLeft: -p.size / 2, marginTop: -p.size / 2,
              background: p.color,
              borderRadius: p.id % 3 === 0 ? "50%" : 2,
            }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 4, 0] }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            position: "absolute",
            width: 16, height: 16,
            marginLeft: -8, marginTop: -8,
            borderRadius: "50%", background: PAL.mustard,
            boxShadow: `0 0 40px ${PAL.mustard}`,
          }}
        />
      </div>

      {/* Big number reveal */}
      <div style={{ position: "absolute", left: 24, right: 24, top: "52%" }}>
        <Pill bg={PAL.lime} fg={PAL.ink}>Reach · MAU</Pill>
        <motion.div
          className="w-display"
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...spring, delay: 1.5, stiffness: 200, damping: 16 }}
          style={{
            marginTop: 16,
            fontSize: "clamp(64px, 18vw, 110px)",
            color: PAL.lime,
          }}
        >
          {fc.bigNumber}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          style={{
            marginTop: 10, fontSize: 20, fontWeight: 600, color: theme.ink,
          }}
        >
          monthly active users
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="w-serif"
          style={{
            marginTop: 22, fontSize: 22, lineHeight: 1.3,
            color: theme.ink, opacity: 0.85, maxWidth: 320,
          }}
        >
          Bigger than {fc.comparisonCity}. Getting close to Mangalore.
        </motion.div>
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 2 — Big year (lime)
 * ============================================================ */
export function Card2() {
  const theme = T.lime;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={300} x="-20%" y="55%" delay={0.2} opacity={0.6} />
      <Squiggle color={theme.accent} style={{ left: 0, right: 0, top: 80, height: 50, width: "100%" }} />
      <DeckMark theme={theme} />
      <PageNo n={3} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 90 }}>
        <Pill bg={theme.ink} fg={theme.bg}>Chapter 01 · Scale</Pill>
        <motion.h2
          className="w-display"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            margin: "22px 0 0", fontSize: "clamp(56px, 13vw, 84px)",
            color: theme.ink,
          }}
        >
          A <span style={{ color: theme.accent }}>massive</span><br />
          year for<br />
          {wrappedConfig.companyName}.
        </motion.h2>
      </div>

      <div style={{
        position: "absolute", left: 24, right: 24, bottom: 70,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
      }}>
        {[
          { k: "Growth", v: wrappedConfig.stats.growth, bg: theme.accent, fg: PAL.light },
          { k: "New teammates", v: String(wrappedConfig.stats.newTeammates), bg: theme.ink, fg: theme.bg },
        ].map((s, i) => (
          <motion.div key={s.k}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 + i * 0.1 }}
            style={{
              padding: "16px 18px", borderRadius: 16,
              background: s.bg, color: s.fg,
            }}>
            <div className="w-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {s.k}
            </div>
            <div className="w-display" style={{ marginTop: 4, fontSize: 36 }}>{s.v}</div>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 3 — Hires (hotpink)
 * ============================================================ */
export function Card3() {
  const TAL = {
    bg: "#FF6B35",
    dark: "#0A0A0A",
    cream: "#FFF4E6",
    yellow: "#FFB800",
    deep: "#CC3D0E",
  };
  const theme: Theme = { bg: TAL.bg, ink: TAL.cream, accent: TAL.yellow, blob: TAL.deep };

  const monthlyAdds = [
    { fullLabel: "May '24", delta: 0 },  { fullLabel: "Jun '24", delta: 3 },
    { fullLabel: "Jul '24", delta: 6 },  { fullLabel: "Aug '24", delta: 0 },
    { fullLabel: "Sep '24", delta: 1 },  { fullLabel: "Oct '24", delta: 2 },
    { fullLabel: "Nov '24", delta: 0 },  { fullLabel: "Dec '24", delta: 4 },
    { fullLabel: "Jan '25", delta: 10 }, { fullLabel: "Feb '25", delta: 18 },
    { fullLabel: "Mar '25", delta: 37 }, { fullLabel: "Apr '25", delta: 20 },
    { fullLabel: "May '25", delta: 29 }, { fullLabel: "Jun '25", delta: 42 },
    { fullLabel: "Jul '25", delta: 31 }, { fullLabel: "Aug '25", delta: 16 },
    { fullLabel: "Sep '25", delta: 37 }, { fullLabel: "Oct '25", delta: 44 },
    { fullLabel: "Nov '25", delta: 6 },  { fullLabel: "Dec '25", delta: 18 },
    { fullLabel: "Jan '26", delta: 39 }, { fullLabel: "Feb '26", delta: 15 },
    { fullLabel: "Mar '26", delta: 28 }, { fullLabel: "Apr '26", delta: 22 },
    { fullLabel: "May '26", delta: 12 },
  ];
  const peakIdx = 17;
  const max = 44;
  const maxH = 170;

  const ease = [0.22, 1, 0.36, 1] as const;
  const overshoot = [0.34, 1.56, 0.64, 1] as const;

  const [hover, setHover] = useState<number | null>(null);

  return (
    <Shell theme={theme}>
      <DeckMark theme={theme} />
      <PageNo n={4} theme={theme} />

      {/* Top-right near-black circle bleeds off corner */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.015, 1],
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.1, ease: "easeOut" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
        }}
        style={{
          position: "absolute",
          top: -180, right: -120,
          width: 300, height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${TAL.dark} 0%, #1F1F1F 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Chapter pill */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.3, ease }}
        style={{
          position: "absolute", top: 64, left: 24, zIndex: 3,
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "9px 16px", borderRadius: 999,
          background: TAL.yellow, color: TAL.dark,
          fontFamily: "Geist, Inter, sans-serif",
          fontSize: 11, fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 6, height: 6, borderRadius: 999, background: TAL.dark }}
        />
        Chapter 03 · Growth
      </motion.div>

      {/* Headline */}
      <div style={{ position: "absolute", left: 24, right: 24, top: 130, zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease }}
          style={{
            fontFamily: "Archivo Black, Geist, sans-serif",
            fontSize: "clamp(44px, 14cqw, 60px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: TAL.cream,
          }}
        >
          13 became{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: [0.85, 1.05, 1],
              textShadow: [
                "0 0 0px rgba(255,184,0,0)",
                "0 0 24px rgba(255,184,0,0.45)",
                "0 0 0px rgba(255,184,0,0)",
              ],
            }}
            transition={{
              opacity: { duration: 0.3, delay: 0.5 },
              scale: { duration: 0.5, delay: 0.5, ease: overshoot },
              textShadow: { duration: 3, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ color: TAL.yellow, display: "inline-block" }}
          >
            453.
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.6, ease }}
          style={{
            marginTop: 6,
            fontFamily: "Archivo Black, Geist, sans-serif",
            fontSize: "clamp(24px, 7cqw, 32px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: TAL.cream,
          }}
        >
          In 24 months.
        </motion.div>
      </div>

      {/* Bar chart */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: 120,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 2,
            height: maxH + 8,
            width: "100%",
            maxWidth: 320,
            position: "relative",
          }}
        >
          {monthlyAdds.map((m, i) => {
            const isPeak = i === peakIdx;
            const h = Math.max(4, (m.delta / max) * maxH);
            const baseDelay = 0.8 + i * 0.06;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: maxH,
                  flex: isPeak ? "0 0 12px" : "0 0 10px",
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {hover === i && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: h + 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: TAL.dark,
                      color: TAL.cream,
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontSize: 10,
                      fontFamily: "Geist Mono, monospace",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      zIndex: 10,
                    }}
                  >
                    +{m.delta} {m.fullLabel}
                  </div>
                )}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={
                    isPeak
                      ? {
                          scaleY: [0, 1, 1.18, 1],
                          opacity: 1,
                          backgroundColor: [TAL.cream, TAL.cream, TAL.yellow, TAL.yellow],
                          boxShadow: [
                            "0 0 0px rgba(255,184,0,0)",
                            "0 0 0px rgba(255,184,0,0)",
                            "0 0 28px rgba(255,184,0,0.6)",
                            "0 0 20px rgba(255,184,0,0.4)",
                          ],
                        }
                      : { scaleY: 1, opacity: 1 }
                  }
                  transition={
                    isPeak
                      ? {
                          scaleY: { duration: 0.9, delay: baseDelay, times: [0, 0.4, 0.7, 1], ease: "easeOut" },
                          opacity: { duration: 0.3, delay: baseDelay },
                          backgroundColor: { duration: 0.9, delay: baseDelay, times: [0, 0.4, 0.7, 1] },
                          boxShadow: { duration: 0.9, delay: baseDelay, times: [0, 0.4, 0.7, 1] },
                        }
                      : { duration: 0.45, delay: baseDelay, ease: "easeOut" }
                  }
                  style={{
                    width: "100%",
                    height: h,
                    background: TAL.cream,
                    borderRadius: "4px 4px 0 0",
                    transformOrigin: "bottom",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                />
                {isPeak && (
                  <motion.div
                    aria-hidden
                    animate={{
                      boxShadow: [
                        "0 0 16px rgba(255,184,0,0.3)",
                        "0 0 28px rgba(255,184,0,0.55)",
                        "0 0 16px rgba(255,184,0,0.3)",
                      ],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    style={{
                      position: "absolute",
                      left: 0, right: 0, bottom: 0,
                      height: h,
                      borderRadius: "4px 4px 0 0",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 320,
            marginTop: 10,
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            style={{ color: TAL.cream }}
          >May '24</motion.span>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            style={{ color: TAL.cream }}
          >Mar '25</motion.span>
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [-1, 1, -1] }}
            transition={{
              opacity: { duration: 0.3, delay: 2.0 },
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
            }}
            style={{ color: TAL.yellow }}
          >Oct '25</motion.span>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ duration: 0.3, delay: 2.2 }}
            style={{ color: TAL.cream }}
          >May '26</motion.span>
        </div>
      </div>

      {/* Bottom callout pill */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5, ease }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "absolute",
          left: 24, right: 24, bottom: 50,
          height: 60,
          borderRadius: 14,
          background: TAL.yellow,
          color: TAL.dark,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Peak hiring month
        </span>
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.4, delay: 2.8, ease: overshoot }}
          style={{
            fontFamily: "Archivo Black, Geist, sans-serif",
            fontSize: 20,
            letterSpacing: "-0.02em",
          }}
        >
          +44 Oct '25
        </motion.span>
        {/* shimmer */}
        <motion.div
          aria-hidden
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.8, delay: 3.4, repeat: Infinity, repeatDelay: 4.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: 0,
            width: "50%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </Shell>
  );
}

/* ============================================================
 * CARD 4 — Customers (lilac)
 * ============================================================ */
export function Card4() {
  const theme = T.lilac;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={260} x="58%" y="55%" delay={0.2} opacity={0.6} />
      <DeckMark theme={theme} />
      <PageNo n={5} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 90 }}>
        <Pill bg={theme.accent} fg={PAL.light}>Chapter 03 · Customers</Pill>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: "26%" }}>
        <motion.div
          className="w-display"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            fontSize: "clamp(72px, 24cqw, 112px)",
            color: theme.ink,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
          }}
        >
          {wrappedConfig.stats.customers}
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ ...springSoft, delay: 0.6 }}
          style={{
            marginTop: 14, height: 6, background: theme.accent,
            transformOrigin: "left", borderRadius: 3,
          }}
        />
        <motion.div
          className="w-display"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.8 }}
          style={{ marginTop: 22, fontSize: 34, color: theme.ink, lineHeight: 1.05 }}
        >
          customers chose<br />
          <span style={{ color: theme.accent }}>{wrappedConfig.companyName}.</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{
            marginTop: 14, fontSize: 14, lineHeight: 1.5,
            color: theme.ink, opacity: 0.8, maxWidth: 290, fontWeight: 500,
          }}
        >
          And kept coming back. Retention is the quiet sound of fewer support tickets.
        </motion.p>
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 5 — Tal Boss quote (cream)
 * ============================================================ */
export function Card5() {
  const theme = T.cream;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={300} x="55%" y="-10%" delay={0.2} opacity={0.7} />
      <Blob color={PAL.lime} size={220} x="-15%" y="55%" delay={0.35} opacity={0.65} />
      <DeckMark theme={theme} />
      <PageNo n={6} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 90 }}>
        <Pill bg={theme.accent} fg={PAL.light}>Note from the desk</Pill>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: "26%" }}>
        <motion.div
          className="w-display"
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            fontSize: "clamp(56px, 14vw, 86px)",
            color: theme.ink,
          }}
        >
          <span style={{ color: theme.accent }}>“</span>Honestly,<br />
          impressed.<span style={{ color: theme.accent }}>”</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          style={{
            marginTop: 36,
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 14px", borderRadius: 999,
            background: theme.ink, color: theme.bg,
            fontSize: 13, fontWeight: 600,
          }}
        >
          <span style={{
            width: 24, height: 24, borderRadius: 999,
            background: theme.accent, display: "inline-block",
          }} />
          Tal Boss · has been watching
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            marginTop: 28, fontSize: 14, lineHeight: 1.55,
            color: theme.ink, opacity: 0.75, maxWidth: 290, fontWeight: 500,
          }}
        >
          Most of the changes this year were small. The compounding wasn't.
        </motion.p>
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 6 — Peak month bars (electric)
 * ============================================================ */
export function Card6() {
  const theme = T.electric;
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const peakIdx = 9;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={260} x="60%" y="-10%" delay={0.2} opacity={0.6} />
      <DeckMark theme={theme} />
      <PageNo n={7} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 90 }}>
        <Pill bg={theme.accent} fg={PAL.ink}>Chapter 04 · Peak</Pill>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: "24%" }}>
        <motion.h2
          className="w-display"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            margin: 0, fontSize: "clamp(44px, 11vw, 64px)",
            color: theme.ink,
          }}
        >
          {wrappedConfig.stats.biggestMonth}<br />
          broke <span style={{ color: theme.accent }}>every</span><br />
          chart.
        </motion.h2>

        <div style={{
          marginTop: 36,
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)",
          alignItems: "end", gap: 5, height: 140,
        }}>
          {months.map((m, i) => {
            const h = 22 + Math.abs(Math.sin(i * 0.9)) * 70 + (i === peakIdx ? 48 : 0);
            const isPeak = i === peakIdx;
            return (
              <motion.div key={i + m}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: h, opacity: 1 }}
                transition={{ ...spring, delay: 0.5 + i * 0.05 }}
                style={{
                  width: "100%",
                  background: isPeak ? theme.accent : theme.ink,
                  opacity: isPeak ? 1 : 0.4,
                  borderRadius: 4,
                }}
              />
            );
          })}
        </div>
        <div className="w-mono" style={{
          marginTop: 8,
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 5,
        }}>
          {months.map((m, i) => (
            <div key={i + "l"} style={{
              textAlign: "center", fontSize: 10,
              color: i === peakIdx ? theme.accent : theme.ink,
              opacity: i === peakIdx ? 1 : 0.5,
              fontWeight: i === peakIdx ? 700 : 500,
            }}>{m}</div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          style={{
            marginTop: 26, display: "flex",
            justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", borderRadius: 12,
            background: theme.accent, color: PAL.ink,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Peak month
          </span>
          <span className="w-display" style={{ fontSize: 22 }}>
            {wrappedConfig.stats.biggestMonthValue}
          </span>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 7 — Top companies (mustard)
 * ============================================================ */
export function Card7() {
  const theme = T.mustard;
  const companies = wrappedConfig.topCompanies;
  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={260} x="-25%" y="-10%" delay={0.2} opacity={0.55} />
      <DeckMark theme={theme} />
      <PageNo n={8} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 90 }}>
        <Pill bg={theme.ink} fg={theme.bg}>Chapter 05 · Neighbours</Pill>
        <motion.h2
          className="w-display"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            margin: "18px 0 0", fontSize: "clamp(36px, 9vw, 52px)",
            color: theme.ink,
          }}
        >
          Top companies<br />from back home.
        </motion.h2>
      </div>

      <div style={{
        position: "absolute", left: 24, right: 24, top: "42%", bottom: 60,
        display: "flex", flexDirection: "column", gap: 0,
      }}>
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.35 + i * 0.08 }}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 36px 1fr auto",
              alignItems: "center", gap: 12,
              padding: "14px 0",
              borderTop: `2px solid ${theme.ink}`,
            }}
          >
            <span className="w-display" style={{ fontSize: 22, color: theme.ink }}>
              {i + 1}
            </span>
            <img src={c.logo} alt="" width={32} height={32}
              style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover", background: PAL.light }} />
            <div style={{ minWidth: 0 }}>
              <div className="w-display" style={{
                fontSize: 18, color: theme.ink, lineHeight: 1.05,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {c.name}
              </div>
              <div style={{
                fontSize: 11, color: theme.ink, opacity: 0.65, marginTop: 2,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                fontWeight: 500,
              }}>
                {c.tagline}
              </div>
            </div>
            <span className="w-mono" style={{ color: theme.ink, fontSize: 14, fontWeight: 700 }}>↗</span>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD FORM (cream)
 * ============================================================ */
export function CardForm({ onSubmit }: { onSubmit: () => void }) {
  const theme = T.cream;
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bestManager, setBestManager] = useState("");
  const canSubmit = name.trim().length > 0;
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    borderRadius: 12, border: `2px solid ${theme.ink}`,
    background: PAL.light, color: theme.ink,
    fontSize: 16, fontWeight: 500, fontFamily: "Geist, sans-serif",
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "'Geist Mono', monospace",
    fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
    marginBottom: 6, color: theme.ink, fontWeight: 700,
  };

  return (
    <Shell theme={theme}>
      <Blob color={theme.blob} size={220} x="65%" y="-10%" delay={0.2} opacity={0.55} />
      <DeckMark theme={theme} />
      <PageNo n={9} theme={theme} />
      <div
        style={{
          position: "absolute", inset: 0,
          padding: "90px 24px 28px",
          display: "flex", flexDirection: "column", overflowY: "auto",
        }}
        onClick={stop}
      >
        <Pill bg={theme.accent} fg={PAL.light}>One last thing</Pill>
        <motion.h2
          className="w-display"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          style={{
            margin: "16px 0 8px",
            fontSize: 40, color: theme.ink,
          }}
        >
          Who's<br />reading?
        </motion.h2>
        <p style={{
          margin: 0, fontSize: 14, color: theme.ink, opacity: 0.7,
          lineHeight: 1.5, fontWeight: 500,
        }}>
          Three quick fields, then back to the deck.
        </p>

        <form
          onClick={stop}
          onSubmit={(e) => { e.preventDefault(); if (canSubmit) onSubmit(); }}
          style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}
        >
          {[
            { id: "cf-name", label: "Your name", value: name, set: setName, ph: "Yash", hint: "" },
            { id: "cf-dept", label: "Department", value: department, set: setDepartment, ph: "Operations", hint: "" },
            { id: "cf-mgr", label: `Best manager at ${wrappedConfig.companyName}`, value: bestManager, set: setBestManager, ph: "Drop a name", hint: "We'll send them a little something. 🎁" },
          ].map((f) => (
            <div key={f.id}>
              <label style={labelStyle} htmlFor={f.id}>{f.label}</label>
              <input id={f.id} style={inputStyle} placeholder={f.ph}
                value={f.value} onChange={(e) => f.set(e.target.value)}
                onClick={stop} onPointerDown={stop} />
              {f.hint && (
                <div style={{
                  marginTop: 6, fontSize: 12, lineHeight: 1.4,
                  color: theme.ink, opacity: 0.65, fontStyle: "italic",
                  fontFamily: "Instrument Serif, Geist, serif",
                }}>
                  {f.hint}
                </div>
              )}
            </div>
          ))}

          <motion.button
            type="submit" disabled={!canSubmit} onClick={stop}
            whileTap={canSubmit ? { y: 2, scale: 0.98 } : undefined}
            transition={spring}
            style={{
              marginTop: 12, padding: "16px 24px", borderRadius: 999,
              background: canSubmit ? theme.ink : "#0E0E1033",
              color: canSubmit ? theme.bg : "#0E0E1080",
              fontWeight: 700, fontSize: 16, border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontFamily: "Geist, sans-serif",
            }}
          >
            Continue →
          </motion.button>
        </form>
      </div>
    </Shell>
  );
}

/* ============================================================
 * CARD 8 — Closing CTA (coral)
 * ============================================================ */
export function Card8() {
  const theme = T.coral;
  return (
    <Shell theme={theme}>
      <motion.div aria-hidden className="w-spin"
        style={{
          position: "absolute", left: "50%", top: "62%",
          width: 520, height: 520, marginLeft: -260, marginTop: -260,
          borderRadius: "50%", border: `2px dashed ${PAL.ink}`,
          opacity: 0.15, pointerEvents: "none",
        }} />
      <Blob color={theme.blob} size={240} x="68%" y="72%" delay={0.2} opacity={0.55} />
      <Blob color={PAL.mustard} size={180} x="-20%" y="-8%" delay={0.35} opacity={0.55} />
      <DeckMark theme={theme} />
      <PageNo n={10} theme={theme} />

      <div style={{ position: "absolute", left: 24, right: 24, top: 70 }}>
        <Pill bg={theme.ink} fg={theme.bg}>End · Chapter 06</Pill>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, top: 120 }}>
        <motion.h2
          className="w-display"
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            margin: 0,
            fontSize: "clamp(38px, 9.5vw, 56px)",
            lineHeight: 0.95,
            color: theme.ink,
          }}
        >
          Your team<br />
          is <span style={{
            background: theme.ink, color: theme.bg,
            padding: "0 10px 2px", borderRadius: 6,
            display: "inline-block",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}>hiring.</span><br />
          Tal Boss makes it<br />
          10× faster.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            marginTop: 20, fontSize: 14, lineHeight: 1.5,
            color: theme.ink, opacity: 0.8, maxWidth: 300, fontWeight: 500,
          }}
        >
          The deck ends here. The year keeps going.<br />So does the pipeline.
        </motion.p>
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 50 }}>
        <motion.a
          href={wrappedConfig.ctaUrl}
          onClick={(e) => e.stopPropagation()}
          whileTap={{ y: 2, scale: 0.98 }}
          transition={spring}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "16px 24px", borderRadius: 999,
            background: theme.ink, color: theme.bg,
            fontWeight: 700, fontSize: 15, textDecoration: "none",
            fontFamily: "Geist, sans-serif",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          Meet Tal Boss <span>→</span>
        </motion.a>
      </div>
    </Shell>
  );
}

/* ───────────── Helpers ───────────── */
function CountUp({ value, delay = 0 }: { value: number; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const duration = 900;
      const start = performance.now();
      let raf = 0;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay * 1000);
    return () => clearTimeout(id);
  }, [value, delay]);
  return <>{n}</>;
}