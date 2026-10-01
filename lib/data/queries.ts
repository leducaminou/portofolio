import prisma from "@/lib/prisma";

export interface PublicProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  clientName: string | null;
  year: number | null;
  featured: boolean;
  tags: string[];
  implementations: string[];
  metrics: { performance: number; seo: number; uptime: number };
  liveUrl: string | null;
  githubUrl: string | null;
}

export interface PublicTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  skills: string[];
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
}

// The public page is statically cached; a DB outage must not take the site down.
async function safe<T>(
  label: string,
  fn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[queries] ${label} failed`, error);
    return fallback;
  }
}

export function getPublishedProjects(lang: string): Promise<PublicProject[]> {
  return safe(
    "getPublishedProjects",
    async () => {
      const rows = await prisma.project.findMany({
        where: { published: true },
        orderBy: [
          { featured: "desc" },
          { sortOrder: "asc" },
          { createdAt: "desc" },
        ],
        include: { translations: { where: { locale: lang } } },
      });
      return rows.map((p) => {
        const t = p.translations[0];
        return {
          id: p.id,
          slug: p.slug,
          title: t?.title ?? p.title,
          description: t?.description ?? p.description,
          image: p.image,
          category: p.category,
          clientName: p.clientName,
          year: p.year,
          featured: p.featured,
          tags: p.tags,
          implementations:
            t && t.implementations.length ? t.implementations : p.implementations,
          metrics: {
            performance: p.performanceScore,
            seo: p.seoScore,
            uptime: p.uptimeScore,
          },
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
        };
      });
    },
    [],
  );
}

export function getPublishedTeam(lang: string): Promise<PublicTeamMember[]> {
  return safe(
    "getPublishedTeam",
    async () => {
      const rows = await prisma.teamMember.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      const fr = lang === "fr";
      return rows.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        bio: (fr ? m.bioFr : m.bioEn) || m.bioEn || m.bioFr,
        image: m.image,
        skills: m.skills,
        githubUrl: m.githubUrl,
        linkedinUrl: m.linkedinUrl,
        twitterUrl: m.twitterUrl,
      }));
    },
    [],
  );
}
