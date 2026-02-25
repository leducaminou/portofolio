import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { userData } from "./data";

const connectionString = process.env.DATABASE_URL!;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  // Optional: Clear existing users
  await prisma.user.deleteMany();
  console.log("Cleared existing users.");

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const admin = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
    },
  });

  console.log(`Created admin user: ${admin.email}`);
  console.log("Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
