import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {HeroSection} from "@/components/sections/hero-section";
import {AboutSection} from "@/components/sections/about-section";
import {FeaturesSection} from "@/components/sections/features-section";
import {GallerySection} from "@/components/sections/gallery-section";
import {ReservationCtaSection} from "@/components/sections/reservation-cta-section";
import {LocationSection} from "@/components/sections/location-section";
import {ContactSection} from "@/components/sections/contact-section";
import {routing, type AppLocale} from "@/i18n/routing";
import {siteConfig} from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type HomePageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
  const t = await getTranslations({locale: currentLocale});

  return {
    title: t("meta.homeTitle"),
    description: t("meta.homeDescription"),
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        ar: "/ar",
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      title: t("meta.homeTitle"),
      description: t("meta.homeDescription"),
      url: `/${currentLocale}`,
      locale: currentLocale,
      type: "website",
      images: [
        {
          url: "/images/hero-sunset.jpg",
          width: 1600,
          height: 900,
          alt: "Tiberias View",
        },
      ],
    },
  };
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  const currentLocale = (routing.locales.includes(locale as AppLocale)
    ? locale
    : routing.defaultLocale) as AppLocale;

  setRequestLocale(currentLocale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: siteConfig.name,
    alternateName: siteConfig.arabicName,
    image: `${siteUrl}/images/hero-sunset.jpg`,
    telephone: siteConfig.phoneDisplay,
    url: `${siteUrl}/${currentLocale}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locationEn,
      addressLocality: "Al-Manshiya",
      addressCountry: "JO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [siteConfig.facebookHref],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <HeroSection locale={currentLocale} />
      <AboutSection locale={currentLocale} />
      <FeaturesSection locale={currentLocale} />
      <GallerySection />
      <ReservationCtaSection locale={currentLocale} />
      <LocationSection locale={currentLocale} />
      <ContactSection locale={currentLocale} />
    </main>
  );
}
