"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import TypeWriter from "@/components/ui/TypeWriter";
import type { Dictionary } from "@/lib/i18n/types";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-background">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Available for work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-4xl md:text-4xl lg:text-5xl font-bold  mb-4 glow-text text-white"
        >
          <span className="font-light">Aminou</span> Mohamadou
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 h-10"
        >
          <TypeWriter words={dict.hero.roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8"
        >
          {dict.hero.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {dict.hero.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="nav-tag"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("projects")}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            {dict.hero.cta_work}
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("contact")}
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            {dict.hero.cta_contact}
          </motion.button>
        </motion.div>

        {/* Avatar Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-3">
            {[
              "bg-gradient-to-br from-violet-500 to-purple-600",
              "bg-gradient-to-br from-cyan-500 to-blue-600",
              "bg-gradient-to-br from-pink-500 to-rose-600",
              "bg-gradient-to-br from-amber-500 to-orange-600",
            ].map((bg, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full border-2 border-background ${bg} flex items-center justify-center text-xs font-bold text-white`}
              >
                {["JD", "AK", "SM", "LP"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted">
            <span className="text-accent-light font-semibold">50+</span> happy
            clients
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-accent/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
