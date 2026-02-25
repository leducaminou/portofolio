"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { servicesData } from "@/lib/data/fake-data";
import type { Dictionary } from "@/lib/i18n/types";

interface ServicesProps {
  dict: Dictionary;
}

export default function Services({ dict }: ServicesProps) {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const dictItem = dict.services.items[index];
            return (
              <GlowCard key={service.title} delay={index * 0.1}>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {dictItem?.title || service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {dictItem?.description || service.description}
                </p>
                <motion.div
                  className="mt-4 h-0.5 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  style={{
                    background: `linear-gradient(90deg, var(--color-accent), var(--color-accent-cyan))`,
                    transformOrigin: "left",
                  }}
                />
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
