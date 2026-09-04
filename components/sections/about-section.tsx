import Image from "next/image";
import {getTranslations} from "next-intl/server";
import type {AppLocale} from "@/i18n/routing";

type AboutSectionProps = {
  locale: AppLocale;
};

export async function AboutSection({locale}: AboutSectionProps) {
  const t = await getTranslations({locale});

  return (
    <section id="about" className="tv-section tv-gradient-bg">
      <div className="tv-container">
        <div className="tv-card grid gap-0 overflow-hidden md:grid-cols-2">
          <div className="relative min-h-64 md:min-h-full">
            <Image
              src="/images/fountain-evening.jpg"
              alt={t("gallery.fountainEveningAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="tv-eyebrow">{t("about.eyebrow")}</p>
            <h2 className="tv-title mt-3 text-deep-green">{t("about.title")}</h2>
            <p className="tv-subtitle mt-6">{t("about.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
