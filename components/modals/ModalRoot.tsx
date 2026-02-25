"use client";

import { useModal } from "@/components/modals/ModalContext";
import Modal from "@/components/ui/Modal";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import Button from "@/components/ui/Button";

export default function ModalRoot() {
  const { type, data, closeModal } = useModal();

  if (!type) return null;

  if (type === "project-form") {
    return (
      <Modal title={data?.project ? "Edit Project" : "New Project"}>
        <ProjectForm />
      </Modal>
    );
  }

  if (type === "confirm-delete") {
    const { onConfirm, title, message, isLoading } = data;
    return (
      <Modal title={title || "Confirm Delete"}>
        <div className="space-y-6 text-center">
          <p className="text-muted">
            {message || "Are you sure you want to delete this item?"}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={isLoading} onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
}
