import {NextRequest} from "next/server";
import createMiddleware from "next-intl/middleware";
import {localeFromPathname, routing, isRtlLocale} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const locale = localeFromPathname(request.nextUrl.pathname);

  response.headers.set("x-tv-locale", locale);
  response.headers.set("x-tv-dir", isRtlLocale(locale) ? "rtl" : "ltr");

  return response;
}

export const config = {
  matcher: ["/", "/(ar|en|de)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
