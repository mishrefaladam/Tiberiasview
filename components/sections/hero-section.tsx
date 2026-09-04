import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {MapPin} from "lucide-react";
import {siteConfig} from "@/lib/site-config";
import type {AppLocale} from "@/i18n/routing";

type HeroSectionProps = {
  locale: AppLocale;
};

export async function HeroSection({locale}: HeroSectionProps) {
  const t = await getTranslations({locale});

  return (
    <section id="top" className="relative isolate overflow-hidden bg-deep-green text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sunset.jpg"
          alt={t("gallery.heroSunsetAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-green/70 via-deep-green/65 to-deep-green/90" />
      </div>

      <div className="tv-container relative py-24 md:py-32">
        <div className="max-w-3xl tv-reveal">
          <p className="tv-eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="tv-title mt-4 text-white">{t("hero.title")}</h1>
          <h2 className="mt-4 text-2xl font-semibold text-white/95 md:text-3xl">{t("hero.headline")}</h2>
          <p className="tv-subtitle mt-5 text-white/92">{t("hero.description")}</p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/85">
            <MapPin size={16} className="shrink-0 text-gold" />
            {siteConfig.locationEn}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/booking`} className="tv-btn-primary">
              {t("cta.bookNow")}
            </Link>
            <Link
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tv-btn-secondary"
            >
              {t("cta.whatsapp")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(["family", "kids", "grill", "view"] as const).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium"
              >
                {t(`hero.chips.${item}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
