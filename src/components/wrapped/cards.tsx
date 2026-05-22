import { motion } from "framer-motion";
import { Mascot } from "./Mascot";
import { ParallelogramFan, StairBlock } from "./StairShape";
import { wrappedConfig } from "@/config/stats";

const CREAM = "#FFF4E6";
const ORANGE = "#FF6B35";
const DEEP = "#CC3D0E";
const ACCENT = "#FFB800";
const CYAN = "#00C2FF";

const ease = [0.65, 0, 0.35, 1] as const;

/** Container that fills the 9:16 viewport. */
function CardShell({
  children,
  background,
  style,
}: {
  children: React.ReactNode;
  background: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background,
        color: CREAM,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BreathingBg({ from, to }: { from: string; to: string }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        inset: "-20%",
        background: `radial-gradient(circle at 50% 50%, ${from} 0%, ${to} 70%)`,
      }}
      animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
 * CARD 1 — Title (giant 3D 2025 numeral)
 * ============================================================ */
export function Card1({ name }: { name: string }) {
  // exit: explode into ~40 fragments
  const fragments = Array.from({ length: 40 });
  return (
    <CardShell background="#1a0a04">
      <BreathingBg from={DEEP} to="#3a0e02" />
      {/* Giant extruded year */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ExtrudedYear year={wrappedConfig.year} />
      </motion.div>

      {/* Exit-only fragment explosion overlay */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0 }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {fragments.map((_, i) => {
          const angle = (i / fragments.length) * Math.PI * 2;
          const dist = 300 + Math.random() * 200;
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
              exit={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: [0, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 0.8, ease }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 24,
                height: 12,
                background: i % 2 ? ORANGE : ACCENT,
                transform: "skewX(-18deg)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Copy */}
      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 110,
        }}
      >
        <FadeUp delay={0.2}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 36,
              lineHeight: 1.05,
              margin: 0,
              color: CREAM,
            }}
          >
            Hey {name},<br />
            {wrappedConfig.companyName}'s year is wrapped.
          </h1>
        </FadeUp>
        <FadeUp delay={0.5}>
          <p
            style={{
              marginTop: 12,
              fontWeight: 500,
              fontSize: 16,
              opacity: 0.8,
            }}
          >
            Tap to see what you helped build.
          </p>
        </FadeUp>
      </div>

      {/* Mascot peek bottom-right */}
      <motion.div
        style={{ position: "absolute", right: -10, bottom: -8 }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
      >
        <Mascot size={120} rounded={false} />
      </motion.div>
    </CardShell>
  );
}

function ExtrudedYear({ year }: { year: number }) {
  const text = String(year);
  const layers = 12;
  return (
    <div style={{ position: "relative", width: 320, height: 200 }}>
      {Array.from({ length: layers }).map((_, i) => {
        const o = (layers - i) * 3;
        const t = i / layers;
        const color = `rgb(${Math.round(204 - t * 80)}, ${Math.round(
          61 + t * 30,
        )}, ${Math.round(14)})`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o,
              top: o,
              fontWeight: 900,
              fontSize: 180,
              lineHeight: 1,
              color,
              letterSpacing: "-0.05em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {text}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontWeight: 900,
          fontSize: 180,
          lineHeight: 1,
          color: ACCENT,
          letterSpacing: "-0.05em",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ============================================================
 * CARD 2 — Voice opener (fan of parallelograms)
 * ============================================================ */
export function Card2() {
  return (
    <CardShell background="#1a0a04">
      <BreathingBg from="#4a1606" to="#1a0a04" />
      <motion.div
        initial={{ x: -200, y: 200, scale: 0.5, opacity: 0 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={{ scaleY: 1.8, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: "absolute",
          left: "8%",
          top: "18%",
          transformOrigin: "center",
        }}
      >
        <ParallelogramFan width={300} height={420} />
      </motion.div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 90 }}>
        <FadeUp delay={0.2}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 44,
              lineHeight: 1,
              margin: 0,
              color: CREAM,
            }}
          >
            Big year for {wrappedConfig.companyName}.
          </h2>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p
            style={{
              marginTop: 8,
              fontWeight: 500,
              fontSize: 22,
              opacity: 0.85,
            }}
          >
            Bigger than you think.
          </p>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 3 — Hires (top + bottom shapes)
 * ============================================================ */
export function Card3() {
  return (
    <CardShell background="#150704">
      <BreathingBg from="#3a1308" to="#150704" />
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: 60, y: -40, rotate: -10, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <StairBlock width={260} height={70} color={ORANGE} edgeColor={DEEP} />
      </motion.div>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -60, y: 40, rotate: 10, opacity: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        style={{ position: "absolute", bottom: 130, right: 20 }}
      >
        <StairBlock width={260} height={70} color={ACCENT} edgeColor={DEEP} />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 28px",
          textAlign: "center",
        }}
      >
        <div>
          <FadeUp delay={0.3}>
            <div
              style={{
                fontWeight: 900,
                fontSize: 120,
                lineHeight: 1,
                color: CREAM,
                letterSpacing: "-0.05em",
              }}
            >
              {wrappedConfig.stats.hires}
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div style={{ fontWeight: 900, fontSize: 24, marginTop: 8 }}>
              new people hired.
            </div>
          </FadeUp>
          <FadeUp delay={0.7}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginTop: 8,
                opacity: 0.8,
              }}
            >
              That's a whole new floor.
            </div>
          </FadeUp>
        </div>
      </div>

      <div style={{ position: "absolute", left: 16, bottom: 24 }}>
        <Mascot size={56} />
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 4 — Customers (diamond stair-frame)
 * ============================================================ */
export function Card4() {
  return (
    <CardShell background="#1a0a04">
      <BreathingBg from="#5a1a08" to="#1a0a04" />
      {/* Diamond frame */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: 35 }}
        animate={{ scale: 1, opacity: 1, rotate: 45 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 280,
          height: 280,
          marginLeft: -140,
          marginTop: -140,
          background:
            "linear-gradient(135deg, #FF6B35 0%, #FFB800 100%)",
          border: `6px solid ${CREAM}`,
          boxShadow: `8px 8px 0 ${CREAM}, 16px 16px 0 ${DEEP}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 28px",
          textAlign: "center",
        }}
      >
        <FadeUp delay={0.3}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 76,
              color: CREAM,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {wrappedConfig.stats.customers}
          </div>
        </FadeUp>
        <FadeUp delay={0.5}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 20,
              marginTop: 10,
              maxWidth: 240,
            }}
          >
            customers chose {wrappedConfig.companyName}.
          </div>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginTop: 14,
              opacity: 0.85,
            }}
          >
            And they keep coming back.
          </div>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 5 — Mascot moment (CREAM bg, BLACK type)
 * Radial wipe enter (the color-flip moment).
 * ============================================================ */
export function Card5() {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(140% at 50% 50%)" }}
      exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      transition={{ duration: 0.6, ease }}
      style={{
        position: "absolute",
        inset: 0,
        background: CREAM,
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,184,0,0.25) 0%, rgba(255,244,230,0) 60%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot size={280} rounded={false} bob={false} />
      </motion.div>
      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 110,
          color: "#0A0A0A",
        }}
      >
        <FadeUp delay={0.3}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 40,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Tal Boss has been watching.
          </h2>
        </FadeUp>
        <FadeUp delay={0.55}>
          <p style={{ marginTop: 10, fontWeight: 500, fontSize: 18 }}>
            Impressed, honestly.
          </p>
        </FadeUp>
      </div>
    </motion.div>
  );
}

/* ============================================================
 * CARD 6 — Biggest month (diagonal corner layout)
 * Diagonal wipe enter.
 * ============================================================ */
export function Card6() {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      animate={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease }}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <CardShell background="#1a0a04">
        <BreathingBg from="#4a1606" to="#1a0a04" />
        {/* Top-right shape thrown by mascot */}
        <motion.div
          initial={{ x: 200, y: -200, rotate: 30, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          style={{ position: "absolute", top: 30, right: -20 }}
        >
          <StairBlock width={220} height={140} color={ORANGE} edgeColor={DEEP} />
        </motion.div>
        <motion.div
          initial={{ x: -200, y: 200, rotate: -30, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          style={{ position: "absolute", bottom: 90, left: -20 }}
        >
          <StairBlock width={220} height={140} color={ACCENT} edgeColor={DEEP} />
        </motion.div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 28px",
            textAlign: "center",
          }}
        >
          <div>
            <FadeUp delay={0.4}>
              <div style={{ fontWeight: 500, fontSize: 16, opacity: 0.8 }}>
                Biggest month
              </div>
            </FadeUp>
            <FadeUp delay={0.55}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 64,
                  lineHeight: 1,
                  marginTop: 6,
                  letterSpacing: "-0.03em",
                }}
              >
                {wrappedConfig.stats.biggestMonth}
              </div>
            </FadeUp>
            <FadeUp delay={0.7}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 24,
                  marginTop: 8,
                  color: ACCENT,
                }}
              >
                {wrappedConfig.stats.biggestMonthValue}
              </div>
            </FadeUp>
            <FadeUp delay={0.85}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  marginTop: 16,
                  opacity: 0.85,
                }}
              >
                Where do you find the time?
              </div>
            </FadeUp>
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

/* ============================================================
 * CARD 7 — Growth banded layout
 * ============================================================ */
export function Card7() {
  return (
    <CardShell background="#1a0a04">
      <BreathingBg from="#3a1208" to="#1a0a04" />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          height: 90,
          background: `linear-gradient(90deg, ${DEEP}, ${ORANGE})`,
          transformOrigin: "left",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          height: 90,
          background: `linear-gradient(90deg, ${ORANGE}, ${ACCENT})`,
          transformOrigin: "right",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <FadeUp delay={0.3}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {wrappedConfig.stats.growth}
          </div>
        </FadeUp>
        <FadeUp delay={0.5}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>growth.</div>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>
            {wrappedConfig.stats.newTeammates} new teammates.
          </div>
        </FadeUp>
        <FadeUp delay={0.9}>
          <div style={{ fontWeight: 900, fontSize: 22, color: ACCENT }}>
            One {wrappedConfig.companyName}.
          </div>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 8 — Tal Boss CTA finale
 * ============================================================ */
export function Card8() {
  return (
    <CardShell background="#1a0a04">
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10%",
          background: `radial-gradient(circle at 30% 30%, ${DEEP} 0%, #1a0a04 70%)`,
        }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1.15, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease }}
        style={{
          position: "absolute",
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ParallelogramFan count={12} width={340} height={460} />
      </motion.div>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "32%",
          transform: "translateX(-50%)",
        }}
      >
        <Mascot size={180} rounded={false} />
      </motion.div>

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 120,
          textAlign: "center",
        }}
      >
        <FadeUp delay={0.6}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 32,
              lineHeight: 1.1,
              margin: 0,
              color: CREAM,
            }}
          >
            Your team is hiring.
            <br />
            Tal Boss makes it 10x faster.
          </h2>
        </FadeUp>
        <FadeUp delay={0.9}>
          <a
            href={wrappedConfig.ctaUrl}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-block",
              marginTop: 22,
              padding: "16px 28px",
              borderRadius: 999,
              background: CYAN,
              color: "#0A0A0A",
              fontWeight: 900,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: `0 8px 0 ${DEEP}`,
            }}
          >
            Meet Tal Boss →
          </a>
        </FadeUp>
      </div>
    </CardShell>
  );
}