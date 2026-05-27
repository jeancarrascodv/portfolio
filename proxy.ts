import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

/**
 * Picks the best locale from the `Accept-Language` header, falling back to the
 * default. Kept dependency-free on purpose.
 */
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // e.g. "es-PE,es;q=0.9,en;q=0.8" -> [["es-pe",1],["es",0.9],["en",0.8]]
  const accepted = header
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of accepted) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Does the path already start with a supported locale?
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // No locale -> redirect to the detected one, preserving the rest of the path.
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals, the API and files with extensions
  // (favicon.ico, robots.txt, sitemap.xml, *.pdf, *.svg, images, ...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
