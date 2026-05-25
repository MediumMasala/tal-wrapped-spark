import { motion, type Transition } from "framer-motion";
import { useState, useEffect } from "react";
import { wrappedConfig } from "@/config/stats";

/* ============================================================
 *  Wrapped — editorial deck
 *  Off-black canvas · Geist + Instrument Serif · single
 *  terracotta accent · spring physics · perpetual micro-motion.
 * ============================================================ */

const spring: Transition = { type: "spring", stiffness: 110, damping: 22, mass: 0.9 };
const springSoft: Transition = { type: "spring", stiffness: 80, damping: 24 };

const PAL = {
  coral:    "var(--w-coral)",
  lime:     "var(--w-lime)",
  lilac:    "var(--w-lilac)",
  cream:    "var(--w-cream)",
  hotpink:  "var(--w-hotpink)",
  electric: "var(--w-electric)",
  mustard:  "var(--w-mustard)",
  ink:      "#0E0E10",
  light:    "#FAFAF7",
};

type Theme = { bg: string; ink: string; accent: string };
const THEMES: Record<string, Theme> = {
  coral:    { bg: PAL.coral,    ink: PAL.ink,   accent: PAL.ink },
  lime:     { bg: PAL.lime,     ink: PAL.ink,   accent: PAL.hotpink },
  lilac:    { bg: PAL.lilac,    ink: PAL.ink,   accent: PAL.electric },
  cream:    { bg: PAL.cream,    ink: PAL.ink,   accent: PAL.coral },
  hotpink:  { bg: PAL.hotpink,  ink: PAL.light, accent: PAL.lime },
  electric: { bg: PAL.electric, ink: PAL.light, accent: PAL.mustard },
  mustard:  { bg: PAL.mustard,  ink: PAL.ink,   accent: PAL.electric },
  ink:      { bg: "#0E0E10",    ink: PAL.light, accent: PAL.lime },
};

function Shell({
  children,
  theme,
  grain = true,
}: {
  children: React.ReactNode;
  theme: Theme;
  grain?: boolean;
}) {
  return (
    <div
      className={"wrapped-deck" + (grain ? " w-grain" : "")}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: theme.bg,
        color: theme.ink,
      }}
    >
      {children}
    </div>
  );
}

/* Decorative animated blob */
function Blob({
  color,
  size = 320,
  x = "60%",
  y = "10%",
  delay = 0,
}: { color: string; size?: number; x?: string; y?: string; delay?: number }) {
  return (
    <div
      aria-hidden
      className="w-blob"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(2px)",
        mixBlendMode: "multiply",
        animationDelay: `${delay}s`,
        pointerEvents: "none",
      }}
    />
  );
}

/* Wavy squiggle SVG (Spotify-style) */
function Squiggle({
  color,
  style,
}: { color: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <path
        d="M0 50 Q 50 0 100 50 T 200 50 T 300 50 T 400 50"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pill({
  children,
  bg,
  fg,
}: { children: React.ReactNode; bg: string; fg: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={spring}
      className="w-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      <span
        className="w-pulse-dot"
        style={{ width: 6, height: 6, borderRadius: 999, background: fg }}
      />
      {children}
    </motion.span>
  );
}

function Hairline({ delay = 0, color = "currentColor" }: { delay?: number; color?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.25 }}
      transition={{ ...springSoft, delay }}
      style={{
        height: 2,
        width: "100%",
        background: color,
        transformOrigin: "left",
      }}
    />
  );
}

function PageNo({ n, of = 10, color = "currentColor" }: { n: number; of?: number; color?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 22,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color,
        opacity: 0.6,
      }}
      className="w-mono"
    >
      <span style={{ fontSize: 11, letterSpacing: "0.1em" }}>
        {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")}
      </span>
    </div>
  );
}

function DeckMark({ color = "currentColor", dot }: { color?: string; dot?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 22,
        left: 22,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color,
        opacity: 0.8,
      }}
      className="w-kicker"
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          background: dot ?? color,
          display: "inline-block",
        }}
      />
      {wrappedConfig.companyName} · Wrapped {wrappedConfig.year}
    </div>
  );
}

/* ====================================================================
 * CARD 1 — Title.  Editorial cover: oversized counter, serif italic
 * personal greeting, asymmetric left-aligned, accent block-quote bar.
 * ==================================================================== */
export function Card1({ name }: { name: string }) {
  const yearStr = String(wrappedConfig.year);
  return (
    <Shell>
      <DeckMark />
      <PageNo n={1} />

      {/* Counter — bottom-right typographic anchor */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.08, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="w-mono"
        style={{
          position: "absolute",
          right: -8,
          bottom: 60,
          fontSize: "clamp(220px, 55vw, 420px)",
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: "-0.06em",
          color: C.ink,
          pointerEvents: "none",
        }}
      >
        {yearStr}
      </motion.div>

      {/* Top-left content block */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 70,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <Kicker accent>Annual review · 365 days</Kicker>
        </motion.div>
      </div>

      {/* Centered-left headline */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "32%",
          maxWidth: 360,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.25 }}
          style={{ display: "flex" }}
        >
          <span
            style={{
              width: 3,
              background: C.accent,
              marginRight: 16,
              borderRadius: 1,
            }}
          />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 44,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: C.ink,
              }}
            >
              Hey{" "}
              <span className="w-serif" style={{ color: C.accent, fontWeight: 400 }}>
                {name}
              </span>
              ,
              <br />
              the year{" "}
              <span className="w-serif" style={{ fontWeight: 400 }}>
                we built
              </span>
              <br />
              together.
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                marginTop: 22,
                fontSize: 14,
                lineHeight: 1.5,
                color: C.ink2,
                maxWidth: 280,
              }}
            >
              {wrappedConfig.companyName} in nine chapters. Tap, swipe, hold —
              this is how the year actually felt.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline reveal */}
      <div style={{ position: "absolute", left: 28, right: 28, bottom: 60 }}>
        <Hairline delay={0.55} />
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span className="w-kicker">Tap to begin</span>
          <span className="w-kicker" style={{ color: C.ink3 }}>
            <span className="w-caret">▍</span>
          </span>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD FIRECRACKER — MAU reveal.  Restrained: a thin ascending rule
 * snaps up to a hairline burst, then a giant Geist-Mono numeric drops
 * in with staggered subtitle.  Karnataka outline replaced by a single
 * geographic comparison row with a small marker.
 * ==================================================================== */
export function CardFirecracker() {
  const fc = wrappedConfig.firecracker;
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const dist = 140;
    return { id: i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  });

  return (
    <Shell>
      <DeckMark />
      <PageNo n={2} />

      {/* Ascending rule */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: ["0vh", "55vh"], opacity: [0, 1] }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "30%",
          width: 1,
          marginLeft: -0.5,
          background: `linear-gradient(to top, transparent, ${C.accent})`,
          transformOrigin: "bottom",
        }}
      />

      {/* Burst — small radial rays */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          width: 0,
          height: 0,
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
            transition={{
              duration: 0.9,
              delay: 1.05,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            style={{
              position: "absolute",
              width: 2,
              height: 18,
              marginLeft: -1,
              marginTop: -9,
              background: C.accent,
              transformOrigin: "center",
              transform: `rotate(${(p.id / 14) * 360}deg) translateY(-30px)`,
              borderRadius: 1,
            }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 2.5, 0] }}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            borderRadius: "50%",
            background: C.accent,
            boxShadow: `0 0 20px ${C.accent}`,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "44%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.7 }}
        >
          <Kicker accent>Reach · monthly active users</Kicker>
        </motion.div>
        <motion.div
          className="w-mono"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...spring, delay: 1.85 }}
          style={{
            marginTop: 18,
            fontSize: "clamp(64px, 16vw, 96px)",
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.06em",
            color: C.ink,
          }}
        >
          {fc.bigNumber}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.5 }}
          style={{
            marginTop: 6,
            fontSize: 18,
            color: C.ink,
            fontWeight: 400,
          }}
        >
          {fc.label}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 2.3 }}
          style={{ marginTop: 26 }}
        >
          <Hairline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 2.45 }}
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: C.ink2,
            fontSize: 13,
          }}
        >
          <span>
            ≈ population of{" "}
            <span style={{ color: C.ink, fontWeight: 500 }}>{fc.comparisonCity}</span>
          </span>
          <span className="w-mono" style={{ color: C.ink3 }}>
            ~{fc.comparisonPopulation}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.4 }}
          className="w-serif"
          style={{
            marginTop: 18,
            fontSize: 17,
            color: C.ink2,
            lineHeight: 1.35,
            maxWidth: 290,
          }}
        >
          And honestly — getting close to Mangalore.
        </motion.div>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 2 — Big year for {company}.  Split-screen: oversized italic
 * serif "big" + sans body, vertical company name spine on left.
 * ==================================================================== */
export function Card2() {
  const company = wrappedConfig.companyName;
  return (
    <Shell>
      <DeckMark />
      <PageNo n={3} />

      {/* Vertical spine label */}
      <div
        className="w-kicker"
        style={{
          position: "absolute",
          left: 22,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "left center",
          color: C.ink3,
          whiteSpace: "nowrap",
        }}
      >
        Chapter 01 — Scale
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 28,
          top: 92,
          bottom: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <Kicker>FY {wrappedConfig.year} · in summary</Kicker>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            margin: "22px 0 0",
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            color: C.ink,
          }}
        >
          A{" "}
          <span className="w-serif" style={{ color: C.accent, fontWeight: 400 }}>
            big
          </span>{" "}
          year for {company}.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{
            marginTop: 24,
            fontSize: 15,
            lineHeight: 1.55,
            color: C.ink2,
            maxWidth: 320,
          }}
        >
          Numbers grew. Teams grew. The list of things you stopped doing manually
          grew the fastest. Here's what the year actually looked like.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          style={{ marginTop: 36 }}
        >
          <Hairline />
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {[
              { k: "Growth", v: wrappedConfig.stats.growth },
              { k: "New teammates", v: String(wrappedConfig.stats.newTeammates) },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.85 + i * 0.1 }}
              >
                <div className="w-kicker" style={{ color: C.ink3 }}>
                  {s.k}
                </div>
                <div
                  className="w-mono"
                  style={{
                    marginTop: 6,
                    fontSize: 30,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: C.ink,
                  }}
                >
                  {s.v}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 3 — People hired.  Asymmetric: oversized mono numeral on the
 * right, label and supporting copy on the left.  Animated count-up.
 * ==================================================================== */
export function Card3() {
  const hires = wrappedConfig.stats.hires;
  return (
    <Shell>
      <DeckMark />
      <PageNo n={4} />

      {/* Right-side numeral */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.15 }}
        className="w-mono"
        style={{
          position: "absolute",
          right: -10,
          top: "30%",
          fontSize: "clamp(280px, 70vw, 480px)",
          fontWeight: 500,
          lineHeight: 0.82,
          letterSpacing: "-0.07em",
          color: C.ink,
          opacity: 1,
        }}
      >
        <CountUp value={hires} delay={0.3} />
      </motion.div>

      {/* Left label block */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 100,
          maxWidth: 220,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <Kicker accent>Chapter 02 — People</Kicker>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            marginTop: 20,
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.ink,
          }}
        >
          New{" "}
          <span className="w-serif" style={{ fontWeight: 400 }}>
            faces
          </span>{" "}
          in the room.
        </motion.div>
      </div>

      {/* Bottom-left footnote */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          bottom: 70,
          maxWidth: 260,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Hairline />
          <p
            style={{
              marginTop: 14,
              fontSize: 14,
              lineHeight: 1.5,
              color: C.ink2,
            }}
          >
            People hired across teams. That's an entirely new floor — and a fair
            amount of new lunch orders.
          </p>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 4 — Customers.  Centered-left big number with hairline-shimmer
 * underline + secondary stat row.
 * ==================================================================== */
export function Card4() {
  const customers = wrappedConfig.stats.customers;
  return (
    <Shell>
      <DeckMark />
      <PageNo n={5} />

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 100,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker>Chapter 03 — Customers</Kicker>
        </motion.div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "30%",
        }}
      >
        <motion.div
          className="w-mono"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            fontSize: "clamp(96px, 22vw, 150px)",
            fontWeight: 500,
            lineHeight: 0.9,
            letterSpacing: "-0.06em",
            color: C.ink,
          }}
        >
          {customers}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...springSoft, delay: 0.55 }}
          style={{ marginTop: 14, transformOrigin: "left" }}
        >
          <div className="w-shimmer-line" style={{ height: 2, width: "100%" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          style={{
            marginTop: 22,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.2,
            color: C.ink,
            maxWidth: 320,
          }}
        >
          Customers chose{" "}
          <span className="w-serif" style={{ color: C.accent, fontWeight: 400 }}>
            {wrappedConfig.companyName}
          </span>
          .
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            marginTop: 12,
            fontSize: 14,
            color: C.ink2,
            maxWidth: 290,
            lineHeight: 1.5,
          }}
        >
          And kept coming back. Retention isn't a number on a slide — it's the
          quiet sound of fewer support tickets.
        </motion.p>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 5 — Tal Boss has been watching.  Editorial pull-quote treatment.
 * Big italic serif quote, attribution, hairline.
 * ==================================================================== */
export function Card5() {
  return (
    <Shell>
      <DeckMark />
      <PageNo n={6} />

      {/* Soft accent radial — subtle, not neon */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute",
          inset: -100,
          background:
            "radial-gradient(circle at 70% 30%, rgba(226,106,74,0.10), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 100,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker accent>Note from the desk</Kicker>
        </motion.div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "28%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="w-serif"
          style={{
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: C.ink,
          }}
        >
          <span style={{ color: C.accent }}>“</span>Honestly,
          <br />
          impressed.<span style={{ color: C.accent }}>”</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.55 }}
          style={{ marginTop: 30 }}
        >
          <Hairline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: C.ink2,
            fontSize: 13,
          }}
        >
          <span>
            <span style={{ color: C.ink, fontWeight: 500 }}>Tal Boss</span>
            <span style={{ color: C.ink3 }}> — has been watching</span>
          </span>
          <span className="w-mono" style={{ color: C.ink3, fontSize: 11 }}>
            FY{wrappedConfig.year}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            marginTop: 32,
            fontSize: 14,
            lineHeight: 1.55,
            color: C.ink2,
            maxWidth: 300,
          }}
        >
          Most of the changes this year were small. The compounding wasn't.
        </motion.p>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 6 — Biggest month. Timeline strip with 12 ticks, October hits.
 * ==================================================================== */
export function Card6() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const peakIdx = 9; // October
  return (
    <Shell>
      <DeckMark />
      <PageNo n={7} />

      <div style={{ position: "absolute", left: 28, right: 28, top: 100 }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker>Chapter 04 — Peak</Kicker>
        </motion.div>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "28%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            alignItems: "end",
            gap: 4,
            height: 120,
          }}
        >
          {months.map((m, i) => {
            const h = 18 + Math.abs(Math.sin(i * 0.9)) * 60 + (i === peakIdx ? 40 : 0);
            const isPeak = i === peakIdx;
            return (
              <motion.div
                key={i + m}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: h, opacity: 1 }}
                transition={{ ...spring, delay: 0.2 + i * 0.05 }}
                style={{
                  width: "100%",
                  background: isPeak ? C.accent : C.hair2,
                  borderRadius: 1,
                  position: "relative",
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 4,
          }}
          className="w-mono"
        >
          {months.map((m, i) => (
            <div
              key={i + "l"}
              style={{
                textAlign: "center",
                fontSize: 10,
                color: i === peakIdx ? C.accent : C.ink3,
                fontWeight: i === peakIdx ? 600 : 400,
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Headline below the chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.1 }}
          style={{
            marginTop: 38,
            fontSize: 38,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: C.ink,
          }}
        >
          {wrappedConfig.stats.biggestMonth} broke{" "}
          <span className="w-serif" style={{ color: C.accent, fontWeight: 400 }}>
            every
          </span>{" "}
          chart.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: C.ink2,
            fontSize: 13,
          }}
        >
          <span>Peak month</span>
          <span className="w-mono" style={{ color: C.ink }}>
            {wrappedConfig.stats.biggestMonthValue}
          </span>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 7 — Top companies (back home).  Editorial numbered list.
 * ==================================================================== */
export function Card7() {
  const companies = wrappedConfig.topCompanies;
  return (
    <Shell>
      <DeckMark />
      <PageNo n={8} />

      <div style={{ position: "absolute", left: 28, right: 28, top: 100 }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker>Chapter 05 — Neighbours</Kicker>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            margin: "20px 0 0",
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.ink,
          }}
        >
          Top companies{" "}
          <span className="w-serif" style={{ fontWeight: 400 }}>
            from
          </span>{" "}
          back home.
        </motion.h2>
      </div>

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "34%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Hairline />
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.25 + i * 0.08 }}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 36px 1fr auto",
              alignItems: "center",
              gap: 14,
              padding: "16px 0",
              borderBottom: `1px solid ${C.hair}`,
            }}
          >
            <span
              className="w-mono"
              style={{ color: C.ink3, fontSize: 12, letterSpacing: "0.1em" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <img
              src={c.logo}
              alt=""
              width={32}
              height={32}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                objectFit: "cover",
                background: C.surface2,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: C.ink,
                  lineHeight: 1.1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.ink3,
                  marginTop: 3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.tagline}
              </div>
            </div>
            <span
              className="w-mono"
              style={{ color: C.ink3, fontSize: 12 }}
            >
              ↗
            </span>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD FORM — Editorial input column.  Floated labels, accent caret,
 * single tactile primary button.
 * ==================================================================== */
export function CardForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bestManager, setBestManager] = useState("");
  const canSubmit = name.trim().length > 0;

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Geist Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 8,
    color: C.ink2,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    borderRadius: 0,
    border: "none",
    borderBottom: `1px solid ${C.hair2}`,
    background: "transparent",
    color: C.ink,
    fontSize: 17,
    fontWeight: 400,
    fontFamily: "Geist, sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <Shell>
      <DeckMark />
      <PageNo n={9} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "100px 28px 32px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
        onClick={stop}
      >
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker accent>One last thing</Kicker>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          style={{
            margin: "18px 0 8px",
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.ink,
          }}
        >
          Tell us who's{" "}
          <span className="w-serif" style={{ fontWeight: 400 }}>
            reading.
          </span>
        </motion.h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: C.ink2,
            lineHeight: 1.55,
            maxWidth: 320,
          }}
        >
          Three quick fields. Then back to the deck.
        </p>

        <form
          onClick={stop}
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onSubmit();
          }}
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {[
            {
              id: "cf-name",
              label: "Your name",
              value: name,
              set: setName,
              ph: "Yash",
            },
            {
              id: "cf-dept",
              label: "Department",
              value: department,
              set: setDepartment,
              ph: "Operations",
            },
            {
              id: "cf-mgr",
              label: `Best manager at ${wrappedConfig.companyName}`,
              value: bestManager,
              set: setBestManager,
              ph: "Drop a name",
            },
          ].map((f) => (
            <div key={f.id}>
              <label style={labelStyle} htmlFor={f.id}>
                {f.label}
              </label>
              <input
                id={f.id}
                style={inputStyle}
                placeholder={f.ph}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                onClick={stop}
                onPointerDown={stop}
              />
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={!canSubmit}
            onClick={stop}
            whileTap={canSubmit ? { y: 1 } : undefined}
            transition={spring}
            style={{
              marginTop: 18,
              padding: "16px 24px",
              borderRadius: 999,
              background: canSubmit ? C.accent : C.surface2,
              color: canSubmit ? "#0E0E10" : C.ink3,
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontFamily: "Geist, sans-serif",
              letterSpacing: "-0.01em",
              transition: "background 0.2s ease",
            }}
          >
            Continue →
          </motion.button>
        </form>
      </div>
    </Shell>
  );
}

/* ====================================================================
 * CARD 8 — Closer.  Editorial CTA: big italic serif headline, single
 * tactile primary button, hairline footer with metadata.
 * ==================================================================== */
export function Card8() {
  return (
    <Shell>
      <DeckMark />
      <PageNo n={10} of={10} />

      {/* Atmospheric accent radial */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          width: 520,
          height: 520,
          marginLeft: -260,
          marginTop: -260,
          background:
            "radial-gradient(circle at center, rgba(226,106,74,0.18), transparent 60%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          width: 360,
          height: 360,
          marginLeft: -180,
          marginTop: -180,
          borderRadius: "50%",
          border: `1px dashed ${C.hair2}`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 100,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <Kicker accent>End · Chapter 06</Kicker>
        </motion.div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "26%",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          style={{
            margin: 0,
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: C.ink,
          }}
        >
          Your team is{" "}
          <span className="w-serif" style={{ color: C.accent, fontWeight: 400 }}>
            hiring.
          </span>
          <br />
          Tal Boss makes it
          <br />
          ten times faster.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            marginTop: 22,
            fontSize: 14,
            lineHeight: 1.55,
            color: C.ink2,
            maxWidth: 320,
          }}
        >
          The deck ends here. The year keeps going. So does the pipeline.
        </motion.p>
      </div>

      {/* Footer CTA */}
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          bottom: 70,
        }}
      >
        <Hairline delay={0.7} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.85 }}
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            className="w-mono"
            style={{ color: C.ink3, fontSize: 11, letterSpacing: "0.1em" }}
          >
            tal.af/boss
          </div>
          <motion.a
            href={wrappedConfig.ctaUrl}
            onClick={(e) => e.stopPropagation()}
            whileTap={{ y: 1 }}
            transition={spring}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              borderRadius: 999,
              background: C.accent,
              color: "#0E0E10",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              fontFamily: "Geist, sans-serif",
            }}
          >
            Meet Tal Boss
            <span style={{ fontFamily: "'Geist Mono', monospace" }}>→</span>
          </motion.a>
        </motion.div>
      </div>
    </Shell>
  );
}

/* ============================================================
 *  Helpers
 * ============================================================ */
function CountUp({ value, delay = 0 }: { value: number; delay?: number }) {
  const [n, setN] = useState(0);
  useStartTimeout(() => {
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
  return <>{n}</>;
}

function useStartTimeout(fn: () => void | (() => void), ms: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useStateOnce(() => {
    let cleanup: void | (() => void);
    const id = window.setTimeout(() => {
      cleanup = fn();
    }, ms);
    return () => {
      clearTimeout(id);
      if (cleanup) cleanup();
    };
  });
}

// One-shot effect-on-mount, returning cleanup. Avoids importing useEffect twice.
import { useEffect as _useEffect } from "react";
function useStateOnce(fn: () => void | (() => void)) {
  _useEffect(() => {
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}