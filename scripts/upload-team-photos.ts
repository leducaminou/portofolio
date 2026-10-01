// One-off: uploads team photos to UploadThing and links them to TeamMember rows.
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { UTApi, UTFile } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const DIR = "C:/Users/Duc Aminou/Downloads/team";
const photos = [
  { name: "Aminou Mohamadou", file: "aminou.webp" },
  { name: "Remy Nguela", file: "remy.webp" },
  { name: "Adrien Mandak", file: "adrien.webp" },
];

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const utapi = new UTApi();

async function main() {
  for (const p of photos) {
    const member = await prisma.teamMember.findFirst({ where: { name: p.name } });
    if (!member) throw new Error(`Member not found: ${p.name}`);
    const buf = await readFile(`${DIR}/${p.file}`);
    const res = await utapi.uploadFiles(new UTFile([buf], p.file, { type: "image/webp" }));
    if (res.error) throw new Error(`${p.file}: ${res.error.message}`);
    await prisma.teamMember.update({ where: { id: member.id }, data: { image: res.data.ufsUrl } });
    console.log(`${p.name} -> ${res.data.ufsUrl}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); await pool.end(); });
