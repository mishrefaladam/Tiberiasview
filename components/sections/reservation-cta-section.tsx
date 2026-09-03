import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {ArrowRightLeft} from "lucide-react";
import type {AppLocale} from "@/i18n/routing";

type ReservationCtaSectionProps = {
  locale: AppLocale;
};

export async function ReservationCtaSection({locale}: ReservationCtaSectionProps) {
  const t = await getTranslations({locale});

  return (
    <section id="booking" className="tv-section">
      <div className="tv-container">
        <div className="relative overflow-hidden rounded-3xl bg-deep-green px-7 py-10 text-white md:px-12 md:py-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -left-14 bottom-0 h-44 w-44 rounded-full bg-sunset/30 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="tv-title text-white">{t("bookingCta.title")}</h2>
              <p className="tv-subtitle mt-3 text-white/90">{t("bookingCta.description")}</p>
            </div>
            <Link href={`/${locale}/booking`} className="tv-btn-primary">
              <ArrowRightLeft size={17} />
              {t("bookingCta.button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
