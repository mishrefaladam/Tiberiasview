import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {BookingForm} from "@/components/booking/booking-form";
import {routing, type AppLocale} from "@/i18n/routing";

type BookingPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: BookingPageProps): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  const t = await getTranslations({locale: currentLocale});

  return {
    title: t("meta.bookingTitle"),
    description: t("meta.bookingDescription"),
  };
}

export default async function BookingPage({params}: BookingPageProps) {
  const {locale} = await params;
  const currentLocale = (routing.locales.includes(locale as AppLocale)
    ? locale
    : routing.defaultLocale) as AppLocale;

  setRequestLocale(currentLocale);
  const t = await getTranslations({locale: currentLocale});

  return (
    <main className="tv-section">
      <div className="tv-container max-w-4xl">
        <h1 className="tv-title text-deep-green">{t("booking.title")}</h1>
        <p className="tv-subtitle mt-4">{t("booking.description")}</p>
        <div className="mt-8">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
