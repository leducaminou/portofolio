"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n/types";
import type { PublicProject } from "@/lib/data/queries";

interface ProjectsProps {
  dict: Dictionary;
  projects: PublicProject[];
}

// 8 = two full rows on the 4-column grid, and a multiple of 2 for the tablet grid.
const PAGE_SIZE = 8;

export default function Projects({ dict, projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [count, setCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<PublicProject | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const visible = filtered.slice(0, count);
  const hasMore = count < filtered.length;
  const canCollapse = count > PAGE_SIZE && filtered.length > PAGE_SIZE;

  const changeFilter = (cat: string) => {
    setFilter(cat);
    setCount(PAGE_SIZE);
  };

  const categoryLabel = (cat: string) => dict.projects.categories[cat] ?? cat;

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
        />

        {projects.length === 0 && (
          <p className="text-center text-muted">{dict.projects.empty}</p>
        )}

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["all", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => changeFilter(cat)}
                className={`nav-tag ${filter === cat ? "active" : ""}`}
              >
                {cat === "all" ? dict.projects.all : categoryLabel(cat)}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
              className="glass-card overflow-hidden text-left flex flex-col group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-light">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur text-[10px] uppercase tracking-wider text-accent-light">
                  {categoryLabel(project.category)}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2 mb-3">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] px-1 py-0.5 text-muted">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {(hasMore || canCollapse) && (
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {hasMore && (
              <button
                onClick={() => setCount((c) => c + PAGE_SIZE)}
                className="nav-tag inline-flex items-center gap-2"
              >
                {dict.projects.show_more} <ChevronDown size={14} />
              </button>
            )}
            {canCollapse && (
              <button
                onClick={() => {
                  setCount(PAGE_SIZE);
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="nav-tag inline-flex items-center gap-2"
              >
                {dict.projects.show_less} <ChevronUp size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            dict={dict}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({
  project,
  dict,
  onClose,
}: {
  project: PublicProject;
  dict: Dictionary;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const metrics = [
    { label: dict.projects.performance, value: project.metrics.performance, color: "text-green-400" },
    { label: dict.projects.seo, value: project.metrics.seo, color: "text-cyan-400" },
    { label: dict.projects.uptime, value: project.metrics.uptime, color: "text-violet-400" },
  ];
  const hasMetrics = metrics.some((m) => m.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-border"
      >
        <button
          onClick={onClose}
          aria-label={dict.projects.close}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[16/8] bg-surface-light">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="768px"
            />
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20 uppercase tracking-wider">
              {dict.projects.categories[project.category] ?? project.category}
            </span>
            {project.year && <span className="text-muted">{project.year}</span>}
            {project.clientName && (
              <span className="text-muted">
                · {dict.projects.client}: {project.clientName}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-muted text-sm mb-6">{project.description}</p>

          {project.tags.length > 0 && (
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
          )}

          {hasMetrics && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {dict.projects.metrics_label}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-muted mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.implementations.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                {dict.projects.implementations_label}
              </h4>
              <ul className="space-y-2">
                {project.implementations.map((impl) => (
                  <li key={impl} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {impl}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-light text-sm font-medium hover:text-accent transition-colors"
              >
                {dict.projects.visit} <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted text-sm font-medium hover:text-white transition-colors"
              >
                {dict.projects.source} <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
