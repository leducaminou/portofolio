import prisma from "./lib/prisma";

async function main() {
  console.log("Prisma instance:", typeof prisma);
  console.log("Prisma project model:", typeof prisma.project);
  
  try {
    const count = await prisma.project.count();
    console.log("Project count:", count);
  } catch (error) {
    console.error("Failed to query projects:", error);
  } finally {
    process.exit(0);
  }
}

main();
