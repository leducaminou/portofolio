import prisma from "@/lib/prisma";
import ProjectList, {
  type AdminProject,
} from "@/components/admin/projects/ProjectList";
import ProjectHeader from "@/components/admin/projects/ProjectHeader";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { translations: { where: { locale: "fr" } } },
  });

  // Flatten for the client: dates -> strings, FR translation -> flat fields used by the form
  const serialized: AdminProject[] = projects.map(
    ({ translations, createdAt, updatedAt, ...p }) => ({
      ...p,
      category: p.category as AdminProject["category"],
      titleFr: translations[0]?.title ?? "",
      descriptionFr: translations[0]?.description ?? "",
      implementationsFr: translations[0]?.implementations ?? [],
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }),
  );

  return (
    <div className="space-y-8">
      <ProjectHeader />
      <ProjectList initialProjects={serialized} />
    </div>
  );
}
