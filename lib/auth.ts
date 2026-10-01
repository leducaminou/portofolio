import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getJwtSecret } from "@/lib/jwt-secret";

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecret());
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, getJwtSecret(), {
    algorithms: ["HS256"],
  });
  return payload;
}

// Backward compatibility exports
export const signToken = encrypt;
export const verifyPassword = async (pass: string, hash: string) => await bcrypt.compare(pass, hash);
export const hashPassword = async (pass: string) => await bcrypt.hash(pass, 10);


export async function login(payload: any) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set("auth_token", session, {
    expires,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function logout() {
  (await cookies()).set("auth_token", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const session = (await cookies()).get("auth_token")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

/** Must be called at the top of every admin server action: actions are public HTTP endpoints. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("auth_token")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "auth_token",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
