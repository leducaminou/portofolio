import prisma from "@/lib/prisma";
import ProjectList from "@/components/admin/projects/ProjectList";
import ProjectHeader from "@/components/admin/projects/ProjectHeader";

type Project = NonNullable<
  Awaited<ReturnType<typeof prisma.project.findFirst>>
>;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Sanitize data for client component (convert Dates to strings)
  const serializedProjects = (projects as Project[]).map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <ProjectHeader />
      <ProjectList initialProjects={serializedProjects} />
    </div>
  );
}
