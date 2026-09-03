import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {BadgeInfo, MapPin, MessageCircle, PhoneCall} from "lucide-react";
import {siteConfig} from "@/lib/site-config";
import type {AppLocale} from "@/i18n/routing";

type SiteFooterProps = {
  locale: AppLocale;
};

const navItems = [
  {key: "home", hash: "top"},
  {key: "about", hash: "about"},
  {key: "facilities", hash: "facilities"},
  {key: "gallery", hash: "gallery"},
  {key: "location", hash: "location"},
] as const;

export async function SiteFooter({locale}: SiteFooterProps) {
  const t = await getTranslations({locale});
  const year = new Date().getFullYear();
  const basePath = `/${locale}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`;

  return (
    <footer className="mt-16 border-t border-deep-green/12 bg-deep-green text-white">
      <div className="tv-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p dir="rtl" className="text-xl font-extrabold">{siteConfig.arabicName}</p>
          <p className="mt-2 text-sm font-semibold text-white/90">{siteConfig.name}</p>
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-start gap-2 text-sm text-white/75 transition hover:text-white"
          >
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>
              <span dir="rtl" className="block">{siteConfig.locationAr}</span>
              <span className="block">{siteConfig.locationEn}</span>
            </span>
          </Link>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="tv-eyebrow text-white/60">{t("footer.linksTitle")}</p>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.hash === "top" ? basePath : `${basePath}#${item.hash}`}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="tv-eyebrow text-white/60">{t("contact.title")}</p>
          <Link href={siteConfig.phoneHref} className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white">
            <PhoneCall size={16} />
            {siteConfig.phoneDisplay}
          </Link>
          <Link
            href={siteConfig.whatsappHref}
            className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            WhatsApp
          </Link>
          <Link
            href={siteConfig.facebookHref}
            className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BadgeInfo size={16} />
            Facebook
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="tv-container flex flex-col-reverse items-center gap-2 py-5 text-xs text-white/60 md:flex-row md:justify-between">
          <p>{year} {siteConfig.name}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
