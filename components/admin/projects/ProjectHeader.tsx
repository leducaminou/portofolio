"use client";

import { useModal } from "@/components/modals/ModalContext";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function ProjectHeader() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Project Management</h1>
        <p className="text-muted">
          Create, edit, and organize your portfolio projects
        </p>
      </div>
      <Button onClick={() => openModal("project-form")} className="sm:self-end">
        <Plus size={18} />
        New Project
      </Button>
    </div>
  );
}
