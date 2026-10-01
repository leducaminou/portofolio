// Shared by lib/auth.ts and proxy.ts so tokens are signed and verified with the same key.
const DEV_FALLBACK = "dev-only-insecure-secret-change-me";

export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set in production");
    }
    return new TextEncoder().encode(DEV_FALLBACK);
  }
  return new TextEncoder().encode(secret);
}
