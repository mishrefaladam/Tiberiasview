import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en", "de"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

export const isRtlLocale = (locale: string): boolean => locale === "ar";

export function localeFromPathname(pathname: string): AppLocale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && routing.locales.includes(segment as AppLocale)) {
    return segment as AppLocale;
  }
  return routing.defaultLocale;
}
