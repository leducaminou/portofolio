import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      return NextResponse.json({ error: "Already seeded" }, { status: 409 });
    }

    const email = process.env.SEED_EMAIL;
    const password = process.env.SEED_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Seed credentials not configured in .env" },
        { status: 500 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ ok: true, message: "Admin user created" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Seed failed", details: error.message },
      { status: 500 }
    );
  }
}
