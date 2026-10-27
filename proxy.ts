import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./app/lib/i18n/config";

const hasLocalePrefix = (pathname: string, locale: string) =>
  pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);

// English is served from unprefixed URLs, French from /fr. Pages are built once per
// locale under app/[lang], so English requests are rewritten onto the /en tree
// internally and /en/... is redirected back to its canonical, unprefixed URL.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (hasLocalePrefix(pathname, defaultLocale)) {
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (locales.some((locale) => hasLocalePrefix(pathname, locale))) return NextResponse.next();

  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (public/ assets, sitemap.xml, robots.txt, favicon).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
