"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useModal } from "@/components/modals/ModalContext";
import { deleteTeamMember } from "@/lib/actions/team";
import Button from "@/components/ui/Button";
import type { TeamMemberInput } from "@/lib/validations";

export type AdminTeamMember = TeamMemberInput & { id: string };

export default function TeamManager({ members }: { members: AdminTeamMember[] }) {
  const { openModal, closeModal } = useModal();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (m: AdminTeamMember) => {
    openModal("confirm-delete", {
      title: "Remove team member",
      message: `Remove "${m.name}" from the team? This cannot be undone.`,
      onConfirm: async () => {
        const result = await deleteTeamMember(m.id);
        if (!result.success) setError(result.error);
        closeModal();
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-muted">Members displayed on the public site</p>
        </div>
        <Button onClick={() => openModal("team-form")}>
          <Plus size={18} />
          Add member
        </Button>
      </div>

      {error && (
        <div role="alert" className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
          {error}
        </div>
      )}

      {members.length === 0 ? (
        <div className="glass-card p-20 text-center text-muted">
          No team members yet. The Team section stays hidden on the public site until you add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.id} className="glass-card p-5 flex gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center font-bold text-white">
                {m.image ? (
                  <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover" />
                ) : (
                  m.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{m.name}</h3>
                <p className="text-sm text-accent-light truncate">{m.role}</p>
                <p className="text-xs text-muted mt-1">
                  {m.published ? "Visible" : "Hidden"} · order {m.sortOrder}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="p-2 h-auto" title="Edit" onClick={() => openModal("team-form", { member: m })}>
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" className="p-2 h-auto text-error/60 hover:text-error" title="Delete" onClick={() => handleDelete(m)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
