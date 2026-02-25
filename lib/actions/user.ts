"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().url("Invalid image URL").optional().nullable(),
});

export async function createUser(formData: z.infer<typeof UserSchema>) {
  const validatedFields = UserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { email, password, image } = validatedFields.data;

  try {
    await prisma.user.create({
      data: {
        email,
        password, // In a real app, hash this!
        image,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/users");
  redirect("/users");
}
