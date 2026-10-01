"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema, ProjectInput } from "@/lib/validations";

type ActionResult =
  | { success: true; id?: string }
  | { success: false; error: string };

const clean = (list: string[]) => list.map((s) => s.trim()).filter(Boolean);
const emptyToNull = (v?: string | null) => (v && v.trim() ? v.trim() : null);

function revalidateAll() {
  revalidatePath("/[lang]/admin", "layout");
  revalidatePath("/[lang]", "page");
}

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message === "Unauthorized") {
    return "Session expired, please log in again.";
  }
  if ((error as { code?: string })?.code === "P2002") {
    return "This slug is already used by another project.";
  }
  console.error(fallback, error);
  return fallback;
}

function parse(data: ProjectInput) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" } as const;
  }

  const { titleFr, descriptionFr, implementationsFr, ...rest } = parsed.data;
  const hasFr = Boolean(titleFr && descriptionFr);
  return {
    project: {
      ...rest,
      image: emptyToNull(rest.image),
      liveUrl: emptyToNull(rest.liveUrl),
      githubUrl: emptyToNull(rest.githubUrl),
      clientName: emptyToNull(rest.clientName),
      year: rest.year ?? null,
      tags: clean(rest.tags),
      implementations: clean(rest.implementations),
    },
    fr: hasFr
      ? {
          title: titleFr!,
          description: descriptionFr!,
          implementations: clean(implementationsFr),
        }
      : null,
  } as const;
}

export async function createProject(data: ProjectInput): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = parse(data);
    if ("error" in parsed) return { success: false, error: String(parsed.error) };

    const project = await prisma.project.create({
      data: {
        ...parsed.project,
        translations: parsed.fr
          ? { create: { locale: "fr", ...parsed.fr } }
          : undefined,
      },
    });

    revalidateAll();
    return { success: true, id: project.id };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to create project"),
    };
  }
}

export async function updateProject(
  id: string,
  data: ProjectInput,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = parse(data);
    if ("error" in parsed) return { success: false, error: String(parsed.error) };

    await prisma.$transaction(async (tx) => {
      await tx.project.update({ where: { id }, data: parsed.project });
      if (parsed.fr) {
        await tx.projectTranslation.upsert({
          where: { projectId_locale: { projectId: id, locale: "fr" } },
          update: parsed.fr,
          create: { projectId: id, locale: "fr", ...parsed.fr },
        });
      } else {
        await tx.projectTranslation.deleteMany({
          where: { projectId: id, locale: "fr" },
        });
      }
    });

    revalidateAll();
    return { success: true, id };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to update project"),
    };
  }
}

export async function setProjectPublished(
  id: string,
  published: boolean,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.project.update({ where: { id }, data: { published } });
    revalidateAll();
    return { success: true, id };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to update project"),
    };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.project.delete({ where: { id } });
    revalidateAll();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to delete project"),
    };
  }
}
