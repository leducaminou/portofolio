"use client";

import { useState } from "react";
import Image from "next/image";
import { useModal } from "@/components/modals/ModalContext";
import { deleteProject } from "@/lib/actions/projects";
import Button from "@/components/ui/Button";
import { Edit2, Trash2, ExternalLink, Github, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectListProps {
  initialProjects: any[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const { openModal, closeModal } = useModal();
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    openModal("confirm-delete", {
      title: "Delete Project",
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      onConfirm: async () => {
        setIsDeletingId(id);
        const result = await deleteProject(id);
        if (!result.success) alert(result.error);
        setIsDeletingId(null);
        closeModal();
      },
    });
  };

  if (initialProjects.length === 0) {
    return (
      <div className="glass-card p-20 text-center space-y-4">
        <div className="text-muted">
          No projects found. Start by creating one!
        </div>
        <Button variant="outline" onClick={() => openModal("project-form")}>
          Create First Project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {initialProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            suppressHydrationWarning
            className="glass-card overflow-hidden flex flex-col group"
          >
            {/* Project Image */}
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
                  No Image
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
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

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-white group-hover:text-accent-light transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="p-1.5 text-muted hover:text-white transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="p-1.5 text-muted hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted line-clamp-2 mb-6 flex-1">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-[10px] text-muted uppercase">Perf</div>
                    <div className="text-xs font-bold text-foreground">
                      {project.performanceScore}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-muted uppercase">SEO</div>
                    <div className="text-xs font-bold text-foreground">
                      {project.seoScore}%
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="p-2 h-auto"
                    onClick={() => openModal("project-form", { project })}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-2 h-auto text-error/60 hover:text-error"
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
  );
}
