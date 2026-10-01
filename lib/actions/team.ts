"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { teamMemberSchema, TeamMemberInput } from "@/lib/validations";

type ActionResult =
  | { success: true; id?: string }
  | { success: false; error: string };

const emptyToNull = (v?: string | null) => (v && v.trim() ? v.trim() : null);

function revalidateAll() {
  revalidatePath("/[lang]/admin", "layout");
  revalidatePath("/[lang]", "page");
}

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message === "Unauthorized") {
    return "Session expired, please log in again.";
  }
  console.error(fallback, error);
  return fallback;
}

function parse(data: TeamMemberInput) {
  const parsed = teamMemberSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data" } as const;
  }
  const v = parsed.data;
  return {
    member: {
      ...v,
      image: emptyToNull(v.image),
      githubUrl: emptyToNull(v.githubUrl),
      linkedinUrl: emptyToNull(v.linkedinUrl),
      twitterUrl: emptyToNull(v.twitterUrl),
      skills: v.skills.map((s) => s.trim()).filter(Boolean),
    },
  } as const;
}

export async function createTeamMember(
  data: TeamMemberInput,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = parse(data);
    if ("error" in parsed) return { success: false, error: String(parsed.error) };
    const member = await prisma.teamMember.create({ data: parsed.member });
    revalidateAll();
    return { success: true, id: member.id };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to create team member"),
    };
  }
}

export async function updateTeamMember(
  id: string,
  data: TeamMemberInput,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = parse(data);
    if ("error" in parsed) return { success: false, error: String(parsed.error) };
    await prisma.teamMember.update({ where: { id }, data: parsed.member });
    revalidateAll();
    return { success: true, id };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to update team member"),
    };
  }
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.teamMember.delete({ where: { id } });
    revalidateAll();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: errorMessage(error, "Failed to delete team member"),
    };
  }
}
