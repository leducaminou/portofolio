const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Prisma keys:", Object.keys(prisma).filter(k => !k.startsWith("_")));
  
  if (prisma.project) {
    console.log("SUCCESS: prisma.project found");
  } else {
    console.log("FAILURE: prisma.project is UNDEFINED");
  }
  
  await pool.end();
}

main().catch(console.error);
