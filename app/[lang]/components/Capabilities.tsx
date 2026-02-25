"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { capabilitiesData } from "@/lib/data/fake-data";
import type { Dictionary } from "@/lib/i18n/types";

interface CapabilitiesProps {
  dict: Dictionary;
}

export default function Capabilities({ dict }: CapabilitiesProps) {
  return (
    <section id="capabilities" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.capabilities.title}
          subtitle={dict.capabilities.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesData.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <GlowCard key={cap.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent-light" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-3">
                      {cap.title}
                    </h3>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm text-muted"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
