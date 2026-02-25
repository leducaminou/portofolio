"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { projectSchema, ProjectInput } from "@/lib/schemas/project";

export async function createProject(data: ProjectInput) {
  try {
    const validated = projectSchema.parse(data);

    const project = await prisma.project.create({
      data: {
        ...validated,
        implementations: validated.implementations || [],
      },
    });

    revalidatePath("/[lang]/admin/projects", "page");
    return { success: true, project };
  } catch (error: any) {
    console.error("Create project error:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProject(id: string, data: ProjectInput) {
  try {
    const validated = projectSchema.parse(data);

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...validated,
        implementations: validated.implementations || [],
      },
    });

    revalidatePath("/[lang]/admin/projects", "page");
    return { success: true, project };
  } catch (error: any) {
    console.error("Update project error:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/[lang]/admin/projects", "page");
    return { success: true };
  } catch (error: any) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
