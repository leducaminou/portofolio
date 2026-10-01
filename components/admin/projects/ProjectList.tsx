"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useModal } from "@/components/modals/ModalContext";
import { deleteProject, setProjectPublished } from "@/lib/actions/projects";
import Button from "@/components/ui/Button";
import {
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Eye,
  EyeOff,
  Search,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectInput } from "@/lib/validations";

export type AdminProject = ProjectInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

interface ProjectListProps {
  initialProjects: AdminProject[];
}

type StatusFilter = "all" | "published" | "draft";

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const { openModal, closeModal } = useModal();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProjects.filter((p) => {
      if (status === "published" && !p.published) return false;
      if (status === "draft" && p.published) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.clientName ?? "").toLowerCase().includes(q)
      );
    });
  }, [initialProjects, query, status]);

  const handleDelete = (id: string, title: string) => {
    openModal("confirm-delete", {
      title: "Delete project",
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      onConfirm: async () => {
        setBusyId(id);
        const result = await deleteProject(id);
        if (!result.success) setError(result.error);
        setBusyId(null);
        closeModal();
      },
    });
  };

  const handleTogglePublished = async (project: AdminProject) => {
    setBusyId(project.id);
    setError(null);
    const result = await setProjectPublished(project.id, !project.published);
    if (!result.success) setError(result.error);
    setBusyId(null);
  };

  if (initialProjects.length === 0) {
    return (
      <div className="glass-card p-20 text-center space-y-4">
        <div className="text-muted">
          No projects yet. Start by creating one!
        </div>
        <Button variant="outline" onClick={() => openModal("project-form")}>
          Create first project
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, technology or client..."
            className="w-full pl-11 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent-light"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`nav-tag capitalize ${status === s ? "active" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-sm"
        >
          {error}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-muted py-10">
          No project matches your filters.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`glass-card overflow-hidden flex flex-col group ${
                busyId === project.id ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-light border-b border-border">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted/20">
                    No image
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.featured && (
                    <div className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase backdrop-blur-md border bg-accent/20 text-accent-light border-accent/30 flex items-center gap-1">
                      <Star size={10} /> Featured
                    </div>
                  )}
                  <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      project.published
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-surface/60 text-muted border-border"
                    }`}
                  >
                    {project.published ? "Live" : "Draft"}
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-1 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="p-1.5 text-muted hover:text-white transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live site"
                        className="p-1.5 text-muted hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-[10px] uppercase text-muted">
                    {project.category}
                    {project.titleFr ? " · EN/FR" : " · EN"}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      className="p-2 h-auto"
                      title={project.published ? "Unpublish" : "Publish"}
                      onClick={() => handleTogglePublished(project)}
                    >
                      {project.published ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-2 h-auto"
                      title="Edit"
                      onClick={() => openModal("project-form", { project })}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-2 h-auto text-error/60 hover:text-error"
                      title="Delete"
                      onClick={() => handleDelete(project.id, project.title)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
