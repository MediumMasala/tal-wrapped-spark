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
} from "./cards";

export function StoryPlayer({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const total = 9;
  // Second-to-last card is the form — disable tap-to-advance there
  const isForm = index === total - 2;

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const cards = [
    <Card1 key="1" name={name} />,
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
        background: "#000",
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
            "radial-gradient(circle at 50% 50%, #3a0e02 0%, #0A0A0A 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          aspectRatio: "9 / 16",
          maxHeight: "100dvh",
          background: "#0A0A0A",
          overflow: "hidden",
          borderRadius: 0,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
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
            padding: "10px 12px 8px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background:
                    i <= index ? "#FFF4E6" : "rgba(255,244,230,0.25)",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}