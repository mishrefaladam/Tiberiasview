import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {MapPin} from "lucide-react";
import {siteConfig} from "@/lib/site-config";
import type {AppLocale} from "@/i18n/routing";

type LocationSectionProps = {
  locale: AppLocale;
};

export async function LocationSection({locale}: LocationSectionProps) {
  const t = await getTranslations({locale});
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`;

  return (
    <section id="location" className="tv-section">
      <div className="tv-container">
        <p className="tv-eyebrow">{t("location.eyebrow")}</p>
        <div className="tv-card mt-4 grid gap-0 overflow-hidden md:grid-cols-[1.3fr_1fr]">
          <div className="p-8 md:p-10">
            <h2 className="tv-title text-deep-green">{t("location.title")}</h2>
            <p className="tv-subtitle mt-4">{t("location.description")}</p>
            <p dir="rtl" className="mt-5 text-base font-semibold text-ink">{siteConfig.locationAr}</p>
            <p className="mt-1 text-sm text-ink/75">{siteConfig.locationEn}</p>
            <Link href={mapUrl} target="_blank" rel="noopener noreferrer" className="tv-btn-primary mt-6">
              <MapPin size={18} />
              {t("location.openMap")}
            </Link>
          </div>
          <div className="relative flex min-h-56 items-center justify-center border-t border-deep-green/8 p-8 md:min-h-full md:border-t-0 md:border-s">
            <Image
              src="/images/night-view-terrace.jpg"
              alt={t("gallery.nightViewAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-green/85 via-deep-green/45 to-deep-green/20" />
            <div className="relative text-center">
              <span className="mx-auto inline-flex rounded-full bg-white text-deep-green p-4">
                <MapPin size={28} />
              </span>
              <p className="mt-4 text-lg font-bold text-white">{t("common.brand")}</p>
              <p className="mt-1 text-sm text-white/80">{siteConfig.locationEn}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
