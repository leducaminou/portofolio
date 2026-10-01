import prisma from "@/lib/prisma";
import TeamManager, {
  type AdminTeamMember,
} from "@/components/admin/team/TeamManager";

export default async function AdminTeamPage() {
  const rows = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const members: AdminTeamMember[] = rows.map(
    ({ createdAt, updatedAt, ...m }) => m,
  );

  return <TeamManager members={members} />;
}
