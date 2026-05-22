import { motion } from "framer-motion";
import talBoss from "/tal-boss.png?url";

export function Mascot({
  size = 64,
  className = "",
  bob = true,
  rounded = true,
}: {
  size?: number;
  className?: string;
  bob?: boolean;
  rounded?: boolean;
}) {
  return (
    <motion.img
      src={talBoss}
      alt="Tal Boss"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? 16 : 0,
        objectFit: "contain",
        userSelect: "none",
        pointerEvents: "none",
      }}
      className={className}
      draggable={false}
      animate={
        bob
          ? { y: [-4, 4, -4] }
          : undefined
      }
      transition={
        bob
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    />
  );
}