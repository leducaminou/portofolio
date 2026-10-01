import Link from "next/link";
import { FolderKanban, Users, Eye, FileEdit } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [total, published, members, recent] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.teamMember.count(),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, published: true, updatedAt: true },
    }),
  ]);

  const stats = [
    { label: "Projects", value: total, icon: FolderKanban, color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Published", value: published, icon: Eye, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Drafts", value: total - published, icon: FileEdit, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Team members", value: members, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-6">
              <div className={`p-3 rounded-xl ${stat.bg} inline-flex mb-4`}>
                <Icon size={20} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recently updated projects</h2>
          <Link href={`/${lang}/admin/projects`} className="text-sm text-accent-light hover:text-accent">
            Manage projects
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-muted">No projects yet.</p>
        ) : (
          <div className="space-y-1">
            {recent.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="text-sm text-foreground">
                  {p.title}
                  <span className={`ml-2 text-xs ${p.published ? "text-success" : "text-muted"}`}>
                    {p.published ? "Live" : "Draft"}
                  </span>
                </div>
                <span className="text-xs text-muted">
                  {p.updatedAt.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
