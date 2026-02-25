"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { techStackData, type StackCategory } from "@/lib/data/fake-data";
import type { Dictionary } from "@/lib/i18n/types";

interface TechStackProps {
  dict: Dictionary;
}

const categoryKeys: StackCategory[] = [
  "frontend",
  "backend",
  "devops",
  "mobile",
];

export default function TechStack({ dict }: TechStackProps) {
  const [active, setActive] = useState<StackCategory>("frontend");

  return (
    <section id="stack" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.stack.title}
          subtitle={dict.stack.subtitle}
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryKeys.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(cat)}
              className={`nav-tag ${active === cat ? "active" : ""}`}
            >
              {dict.stack.categories[cat] || cat}
            </motion.button>
          ))}
        </div>

        {/* Stack Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* We split the category items across cards based on active */}
            {(() => {
              const items = techStackData[active] || [];
              // Create a card for each category that's active
              const categoryLabel = dict.stack.categories[active] || active;
              return (
                <GlowCard className="md:col-span-3">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {categoryLabel}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {items.map((tech, i) => (
                      <ProgressBar
                        key={tech.name}
                        label={tech.name}
                        value={tech.level}
                        delay={i * 0.15}
                      />
                    ))}
                  </div>
                </GlowCard>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
