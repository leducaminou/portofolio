"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  value: number;
  delay?: number;
}

export default function ProgressBar({
  label,
  value,
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-foreground font-medium">{label}</span>
        <span className="text-sm text-accent-light font-mono">{value}%</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
