import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
  Card8,
  CardForm,
  CardFirecracker,
} from "./cards";

export function StoryPlayer({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const total = 10;
  // Second-to-last card is the form — disable tap-to-advance there
  const isForm = index === total - 2;

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (isForm) return;
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const cards = [
    <Card1 key="1" name={name} />,
    <CardFirecracker key="fc" />,
    <Card2 key="2" />,
    <Card3 key="3" />,
    <Card4 key="4" />,
    <Card5 key="5" />,
    <Card6 key="6" />,
    <Card7 key="7" />,
    <CardForm key="form" onSubmit={next} />,
    <Card8 key="8" />,
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#08080A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Blurred ambient backdrop on desktop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(226,106,74,0.12) 0%, #08080A 65%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          aspectRatio: "9 / 16",
          maxHeight: "100dvh",
          background: "#0E0E10",
          overflow: "hidden",
          borderRadius: 0,
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(244,244,245,0.04)",
        }}
      >
        {/* Story card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              style={{ position: "absolute", inset: 0 }}
            >
              {cards[index]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Tap zones (above card, below chrome) */}
        <div
          onClick={isForm ? undefined : prev}
          style={{
            position: "absolute",
            left: 0,
            top: 60,
            bottom: 0,
            width: "35%",
            zIndex: isForm ? 0 : 5,
            cursor: isForm ? "default" : "pointer",
            pointerEvents: isForm ? "none" : "auto",
          }}
          aria-label="Previous"
        />
        <div
          onClick={isForm ? undefined : next}
          style={{
            position: "absolute",
            right: 0,
            top: 60,
            bottom: 0,
            width: "65%",
            zIndex: isForm ? 0 : 5,
            cursor: isForm ? "default" : "pointer",
            pointerEvents: isForm ? "none" : "auto",
          }}
          aria-label="Next"
        />

        {/* Top chrome: progress segments only */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "12px 14px 8px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 2,
                  borderRadius: 1,
                  background:
                    i < index
                      ? "rgba(244,244,245,0.9)"
                      : i === index
                        ? "#E26A4A"
                        : "rgba(244,244,245,0.12)",
                  transition: "background 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}