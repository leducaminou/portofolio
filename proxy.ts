import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-it"
);

const LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";

function getLocale(request: NextRequest): string {
  // Try Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0].trim();
    if (LOCALES.includes(preferredLocale)) return preferredLocale;
  }
  return DEFAULT_LOCALE;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ═══ Locale redirect — only for paths WITHOUT a locale prefix ═══
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newPathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    // Guard: avoid redirect loop if somehow the new pathname equals current
    if (newPathname === pathname) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.redirect(url);
  }

  // ═══ Admin protection ═══
  const currentLocale = pathname.split("/")[1];
  const isAdminPath = pathname.startsWith(`/${currentLocale}/admin`);

  if (isAdminPath) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url)
      );
    }
    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url)
      );
    }
  }

  // ═══ Locale persistence ═══
  const urlLocale = pathname.split("/")[1];
  if (LOCALES.includes(urlLocale)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", urlLocale, {
      path: "/",
      maxAge: 31536000, // 1 year
    });
    return response;
  }

  // Pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - Files with extensions (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|.*\\.(?:jpg|jpeg|png|webp|gif|svg|ico|woff|woff2|ttf|otf|mp4|mp3|pdf)$).*)",
  ],
};
