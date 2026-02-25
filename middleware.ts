import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-it"
);

const LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";

function getLocale(request: NextRequest) {
  // 1. Try cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  // 2. Try headers
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (LOCALES.includes(preferredLocale)) return preferredLocale;
  }

  // 3. Default
  return DEFAULT_LOCALE;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ═══ Locale Management ═══
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  // Detect current locale from pathname
  const currentLocale = pathname.split("/")[1];

  // ═══ Admin Protection ═══
  const isAdminPath = pathname.startsWith(`/${currentLocale}/admin`);

  if (isAdminPath) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }
  }

  // ═══ Persist Locale ═══
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", currentLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
