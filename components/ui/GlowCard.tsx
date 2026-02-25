"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlowCard({
  children,
  className = "",
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
      }}
      className={`glass-card p-6 cursor-pointer ${className}`}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}
