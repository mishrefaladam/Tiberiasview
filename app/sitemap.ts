import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";
import {siteUrl} from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/booking"];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((altLocale) => [altLocale, `${siteUrl}/${altLocale}${path}`]),
        ),
      },
    })),
  );
}
