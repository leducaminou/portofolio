import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log("Connection String:", connectionString ? "Defined" : "Undefined");
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  try {
    console.log("Attempting to instantiate PrismaClient with adapter...");
    const prisma = new PrismaClient({ adapter });
    console.log("Instantiated successfully.");
    
    console.log("Attempting a simple query...");
    const count = await prisma.user.count();
    console.log("User count:", count);
  } catch (error) {
    console.error("Error during Prisma test:", error);
  } finally {
    await pool.end();
  }
}

main();
