"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, LoginInput } from "@/lib/validations";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginInput) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid credentials" };
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" };
    }

    await login({ id: user.id, email: user.email });
    
    // Redirect to admin projects after successful login
    // Note: redirect() throws an error to handle the redirect, so it should be outside of try-catch or handled specially.
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }

  redirect("/admin/projects");
}
