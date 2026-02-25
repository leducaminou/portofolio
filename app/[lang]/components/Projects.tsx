"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectsData } from "@/lib/data/fake-data";
import type { Dictionary } from "@/lib/i18n/types";

interface ProjectsProps {
  dict: Dictionary;
}

export default function Projects({ dict }: ProjectsProps) {
  // Merge static data (image, tags, metrics, urls) with translated text (title, description, implementations)
  const projects = projectsData.map((project, index) => ({
    ...project,
    ...(dict.projects.items[index] ?? {}),
  }));

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
        />

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Content Side */}
                <div
                  className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center"
                  style={{ direction: "ltr" }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      {dict.projects.metrics_label}
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          label: dict.projects.performance,
                          value: project.metrics.performance,
                          color: "text-green-400",
                        },
                        {
                          label: dict.projects.seo,
                          value: project.metrics.seo,
                          color: "text-cyan-400",
                        },
                        {
                          label: dict.projects.uptime,
                          value: project.metrics.uptime,
                          color: "text-violet-400",
                        },
                      ].map((metric) => (
                        <div key={metric.label} className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className={`text-2xl font-bold ${metric.color}`}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-xs text-muted mt-1">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementations */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      {dict.projects.implementations_label}
                    </h4>
                    <ul className="space-y-2">
                      {project.implementations.map((impl) => (
                        <li
                          key={impl}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {impl}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-light text-sm font-medium hover:text-accent transition-colors"
                    >
                      {dict.projects.visit} <ExternalLink size={14} />
                    </motion.a>
                  )}
                </div>

                {/* Image Side */}
                <div
                  className="relative overflow-hidden"
                  style={{ direction: "ltr", minHeight: "320px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-cyan/10 to-accent-pink/10 z-10 pointer-events-none" />
                  {project.image ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-surface-light flex items-center justify-center"
                    >
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center">
                          <ExternalLink size={32} className="text-white" />
                        </div>
                        <p className="text-muted text-sm">Project Preview</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
