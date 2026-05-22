import { motion } from "framer-motion";
import { useState } from "react";
import { Mascot } from "./Mascot";
import { wrappedConfig } from "@/config/stats";
import {
  CheckerboardBg,
  PixelRhombusFrame,
  PixelStairs,
  PixelStripeRow,
  SpikyBurst,
  StackedFan,
  StairText,
} from "./primitives";

const ease = [0.65, 0, 0.35, 1] as const;

function CardShell({
  children,
  background,
  color = "#FFF4E6",
}: {
  children: React.ReactNode;
  background: string;
  color?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background,
        color,
      }}
    >
      {children}
    </div>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
 * CARD 1 — Title: deep red + giant clipped "2025"
 * ============================================================ */
export function Card1({ name }: { name: string }) {
  const fragments = Array.from({ length: 40 });
  return (
    <CardShell background="#B81D13">
      {/* Top pixel stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <PixelStripeRow color="#FF1B6B" alt="#FFCC00" height={20} unit={20} />
      </div>
      {/* Bottom pixel stripe */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <PixelStripeRow color="#FF1B6B" alt="#FFCC00" height={20} unit={20} />
      </div>

      {/* Giant clipped "2025" with stair-stepped pink-orange shadow */}
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
          overflow: "visible",
        }}
      >
        <StairText
          text={String(wrappedConfig.year)}
          color="#FFCC00"
          shadow="#FF6BA1"
          layers={14}
          step={10}
          fontSize="clamp(220px, 42vw, 480px)"
        />
      </motion.div>

      {/* Fragment explosion on exit */}
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
                width: 28,
                height: 14,
                background: i % 2 ? "#FFCC00" : "#FF6BA1",
                transform: "skewX(-18deg)",
              }}
            />
          );
        })}
      </motion.div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 90 }}>
        <FadeUp delay={0.2}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 36,
              lineHeight: 1.05,
              margin: 0,
              color: "#FFF4E6",
              letterSpacing: "-0.02em",
            }}
          >
            Hey {name},<br />
            {wrappedConfig.companyName}'s year is wrapped.
          </h1>
        </FadeUp>
        <FadeUp delay={0.5}>
          <p style={{ marginTop: 10, fontWeight: 600, fontSize: 16, opacity: 0.9 }}>
            Tap to see what you helped build.
          </p>
        </FadeUp>
      </div>

      <motion.div
        style={{ position: "absolute", right: 16, bottom: 24 }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
      >
        <Mascot size={110} rounded={false} />
      </motion.div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 2 — Magenta + diagonal yellow parallelogram fan
 * ============================================================ */
export function Card2() {
  return (
    <CardShell background="#FF1B6B">
      <motion.div
        initial={{ x: -200, y: 200, scale: 0.5, opacity: 0 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={{ scaleY: 1.8, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{ position: "absolute", left: "5%", top: "10%" }}
      >
        <StackedFan
          count={10}
          width={340}
          height={520}
          colorFrom="#FFD700"
          colorTo="#FFCC00"
        />
      </motion.div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 90 }}>
        <FadeUp delay={0.2}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 56,
              lineHeight: 0.95,
              margin: 0,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
            }}
          >
            Big year for<br />
            {wrappedConfig.companyName}.
          </h2>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p style={{ marginTop: 10, fontWeight: 800, fontSize: 22, color: "#B81D13" }}>
            Bigger than you think.
          </p>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 3 — Bright yellow + black type + red rhombus pixel border
 * ============================================================ */
export function Card3() {
  return (
    <CardShell background="#FFD700" color="#0A0A0A">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: 35 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PixelRhombusFrame size={280} color="#B81D13" step={7} steps={6} />
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
                fontSize: "clamp(160px, 32vw, 280px)",
                lineHeight: 0.9,
                letterSpacing: "-0.06em",
                color: "#0A0A0A",
              }}
            >
              {wrappedConfig.stats.hires}
            </div>
          </FadeUp>
          <FadeUp delay={0.55}>
            <div style={{ fontWeight: 900, fontSize: 26, marginTop: 4 }}>
              new people hired.
            </div>
          </FadeUp>
          <FadeUp delay={0.75}>
            <div style={{ fontWeight: 600, fontSize: 16, marginTop: 6, opacity: 0.75 }}>
              That's a whole new floor.
            </div>
          </FadeUp>
        </div>
      </div>

      <div style={{ position: "absolute", right: 12, bottom: 18 }}>
        <Mascot size={84} />
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 4 — Electric blue + receding stair pyramid tunnel
 * ============================================================ */
export function Card4() {
  return (
    <CardShell background="#00A6FF">
      {/* Receding pyramid: nested rotated squares from huge to tiny */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const size = 480 - i * 42;
          const t = i / 10;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease }}
              style={{
                position: "absolute",
                width: size,
                height: size,
                border: `6px solid rgba(255,255,255,${0.15 + t * 0.6})`,
                background:
                  i === 9 ? "#003D7A" : `rgba(0, 70, 140, ${0.05 + t * 0.12})`,
                transform: "rotate(45deg)",
              }}
            />
          );
        })}
      </div>

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
        <FadeUp delay={0.5}>
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(80px, 18vw, 130px)",
              color: "#FFF4E6",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              textShadow: "4px 4px 0 #003D7A",
            }}
          >
            {wrappedConfig.stats.customers}
          </div>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 22,
              marginTop: 14,
              color: "#FFF4E6",
              maxWidth: 260,
            }}
          >
            customers chose {wrappedConfig.companyName}.
          </div>
        </FadeUp>
        <FadeUp delay={0.9}>
          <div style={{ fontWeight: 600, fontSize: 15, marginTop: 12, color: "#E0F4FF" }}>
            And they keep coming back.
          </div>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 5 — Yellow+lime checkerboard + black spiky burst + mascot
 * Radial wipe enter.
 * ============================================================ */
export function Card5() {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(140% at 50% 50%)" }}
      exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      transition={{ duration: 0.6, ease }}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <CheckerboardBg colorA="#FFD700" colorB="#9FE870" cell={80} />

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <SpikyBurst size={420} spikes={16} color="#0A0A0A" />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Mascot size={220} rounded={false} bob={true} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 90,
          color: "#0A0A0A",
        }}
      >
        <FadeUp delay={0.3}>
        <div style={{
          background: "#FFF4E6",
          padding: "16px 18px",
          borderRadius: 14,
          boxShadow: "6px 6px 0 #0A0A0A",
        }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 38,
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Tal Boss has been watching.
          </h2>
          <p style={{ marginTop: 8, marginBottom: 0, fontWeight: 700, fontSize: 16 }}>
            Impressed, honestly.
          </p>
        </div>
        </FadeUp>
      </div>
    </motion.div>
  );
}

/* ============================================================
 * CARD 6 — Deep magenta + opposing cream stair-stepped corners
 * ============================================================ */
export function Card6() {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease }}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <CardShell background="#D90368">
        <motion.div
          initial={{ x: 200, y: -200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          style={{ position: "absolute", top: -20, right: -40 }}
        >
          <PixelStairs
            width={240}
            height={120}
            color="#FFF4E6"
            shadow="#7A0040"
            direction="bl"
            steps={12}
            step={8}
          />
        </motion.div>
        <motion.div
          initial={{ x: -200, y: 200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          style={{ position: "absolute", bottom: 80, left: -40 }}
        >
          <PixelStairs
            width={240}
            height={120}
            color="#FFF4E6"
            shadow="#7A0040"
            direction="tr"
            steps={12}
            step={8}
          />
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
              <div style={{ fontWeight: 700, fontSize: 16, opacity: 0.85, color: "#FFF4E6" }}>
                Biggest month
              </div>
            </FadeUp>
            <FadeUp delay={0.55}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(80px, 18vw, 140px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#FFF4E6",
                  textShadow: "5px 5px 0 #7A0040",
                }}
              >
                {wrappedConfig.stats.biggestMonth}
              </div>
            </FadeUp>
            <FadeUp delay={0.75}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 26,
                  marginTop: 12,
                  color: "#FFD700",
                }}
              >
                {wrappedConfig.stats.biggestMonthValue}
              </div>
            </FadeUp>
            <FadeUp delay={0.9}>
              <div style={{ fontWeight: 600, fontSize: 15, marginTop: 14, color: "#FFF4E6", opacity: 0.9 }}>
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
 * CARD 7 — Top Companies From Back Home (Spotify Top Songs style)
 * Hot pink + clean numbered list
 * ============================================================ */
export function Card7() {
  const companies = wrappedConfig.topCompanies;
  return (
    <CardShell background="#FF4FB8" color="#0A0A0A">
      <div style={{ position: "absolute", top: 70, left: 24, right: 24 }}>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 30,
              lineHeight: 1,
              margin: 0,
              color: "#0A0A0A",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Top Companies<br />From Back Home
          </h2>
        </FadeUp>
      </div>

      <div
        style={{
          position: "absolute",
          top: 180,
          left: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 44,
                width: 44,
                color: "#0A0A0A",
                lineHeight: 1,
                textAlign: "center",
                letterSpacing: "-0.04em",
              }}
            >
              {i + 1}
            </div>
            <img
              src={c.logo}
              alt=""
              width={56}
              height={56}
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                objectFit: "cover",
                background: "#fff",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0A0A0A",
                  opacity: 0.7,
                  marginTop: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.tagline}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 28,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={0.9}>
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "#0A0A0A",
              color: "#FFF4E6",
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.02em",
            }}
          >
            Share this story
          </div>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD 8 — Deep red CTA finale + stacked fan + cyan button
 * ============================================================ */
export function Card8() {
  return (
    <CardShell background="#B81D13">
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10%",
          background:
            "radial-gradient(circle at 50% 35%, #FF6B35 0%, #B81D13 55%, #5A0A04 100%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease }}
        style={{
          position: "absolute",
          left: "50%",
          top: "36%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <StackedFan
          count={12}
          width={340}
          height={460}
          colorFrom="#FFCC00"
          colorTo="#FF6BA1"
          offset={20}
        />
      </motion.div>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translateX(-50%)",
        }}
      >
        <Mascot size={190} rounded={false} />
      </motion.div>

      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 110,
          textAlign: "center",
        }}
      >
        <FadeUp delay={0.6}>
          <h2
            style={{
              display: "inline-block",
              fontWeight: 900,
              fontSize: 30,
              lineHeight: 1.05,
              margin: 0,
              padding: "14px 18px",
              borderRadius: 18,
              background: "rgba(10,10,10,0.78)",
              color: "#FFF4E6",
              letterSpacing: "-0.02em",
              boxShadow: "6px 6px 0 #5A0A04",
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
              padding: "16px 30px",
              borderRadius: 999,
              background: "#00C2FF",
              color: "#0A0A0A",
              fontWeight: 900,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: "0 8px 0 #003D7A",
            }}
          >
            Meet Tal Boss →
          </a>
        </FadeUp>
      </div>
    </CardShell>
  );
}

/* ============================================================
 * CARD FORM — last ask: name, department, best manager
 * ============================================================ */
export function CardForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bestManager, setBestManager] = useState("");
  const canSubmit = name.trim().length > 0;

  const label: React.CSSProperties = {
    display: "block",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#FFF4E6",
    opacity: 0.85,
  };
  const input: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "2px solid rgba(255,244,230,0.3)",
    background: "rgba(0,0,0,0.35)",
    color: "#FFF4E6",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <CardShell background="#2A0A1A">
      <CheckerboardBg colorA="#3A0F26" colorB="#2A0A1A" cell={80} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "60px 24px 32px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
        onClick={stop}
      >
        <FadeUp>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 32,
              lineHeight: 1,
              margin: 0,
              color: "#FFF4E6",
              letterSpacing: "-0.03em",
            }}
          >
            One last thing.
          </h2>
          <p
            style={{
              marginTop: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#FFD700",
            }}
          >
            Tal Boss wants to know about you.
          </p>
        </FadeUp>

        <form
          onClick={stop}
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onSubmit();
          }}
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div>
            <label style={label} htmlFor="cf-name">Your name</label>
            <input
              id="cf-name"
              style={input}
              placeholder="e.g. Yash"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={stop}
              onPointerDown={stop}
            />
          </div>
          <div>
            <label style={label} htmlFor="cf-dept">Department</label>
            <input
              id="cf-dept"
              style={input}
              placeholder="e.g. Operations"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              onClick={stop}
              onPointerDown={stop}
            />
          </div>
          <div>
            <label style={label} htmlFor="cf-mgr">
              Best manager at {wrappedConfig.companyName}?
            </label>
            <input
              id="cf-mgr"
              style={input}
              placeholder="Drop a name 👀"
              value={bestManager}
              onChange={(e) => setBestManager(e.target.value)}
              onClick={stop}
              onPointerDown={stop}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            onClick={stop}
            style={{
              marginTop: 8,
              padding: "16px 28px",
              borderRadius: 999,
              background: canSubmit ? "#FFD700" : "rgba(255,215,0,0.4)",
              color: "#0A0A0A",
              fontWeight: 900,
              fontSize: 16,
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              boxShadow: canSubmit ? "0 6px 0 #B81D13" : "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Submit & finish →
          </button>
        </form>
      </div>
    </CardShell>
  );
}