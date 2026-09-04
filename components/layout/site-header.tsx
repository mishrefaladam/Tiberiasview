"use client";

import Link from "next/link";
import {Menu, X, Globe} from "lucide-react";
import {usePathname} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {routing, type AppLocale} from "@/i18n/routing";
import {siteConfig} from "@/lib/site-config";

type SiteHeaderProps = {
  locale: AppLocale;
};

const navItems = [
  {key: "home", hash: "top"},
  {key: "about", hash: "about"},
  {key: "facilities", hash: "facilities"},
  {key: "gallery", hash: "gallery"},
  {key: "location", hash: "location"},
  {key: "booking", hash: "booking"},
] as const;

function localePath(pathname: string, nextLocale: AppLocale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}`;
  }
  if (routing.locales.includes(segments[0] as AppLocale)) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }
  return `/${nextLocale}/${segments.join("/")}`;
}

export function SiteHeader({locale}: SiteHeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switcherLinks = useMemo(
    () =>
      routing.locales.map((item) => ({
        locale: item,
        href: localePath(pathname, item),
      })),
    [pathname],
  );

  const basePath = `/${locale}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-deep-green/10 shadow-md shadow-deep-green/5" : "border-transparent"
      }`}
    >
      <div className="tv-container flex items-center justify-between gap-4 py-3">
        <Link href={basePath} className="group flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-deep-green text-white grid place-items-center shadow-lg shadow-deep-green/20">
            TV
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-deep-green">{siteConfig.name}</p>
            <p dir="rtl" className="text-sm text-deep-green/70">{siteConfig.arabicNameShort}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const href = item.hash === "booking" ? `${basePath}/booking` : `${basePath}#${item.hash}`;
            return (
              <Link key={item.key} href={href} className="text-sm font-semibold text-ink/85 transition hover:text-deep-green">
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-deep-green/20 bg-white px-2 py-1">
            <Globe size={14} className="text-deep-green" />
            {switcherLinks.map((item) => (
              <Link
                key={item.locale}
                href={item.href}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
                  item.locale === locale ? "bg-deep-green text-white" : "text-deep-green/75 hover:bg-deep-green/10"
                }`}
              >
                {t(`language.${item.locale}`)}
              </Link>
            ))}
          </div>
          <Link href={`${basePath}/booking`} className="tv-btn-primary text-sm">
            {t("cta.bookNow")}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex rounded-xl border border-deep-green/20 p-2 text-deep-green lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-deep-green/10 bg-white lg:hidden">
          <div className="tv-container flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const href = item.hash === "booking" ? `${basePath}/booking` : `${basePath}#${item.hash}`;
              return (
                <Link
                  key={item.key}
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink transition hover:bg-cream"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}

            <div className="mt-2 flex flex-wrap gap-2">
              {switcherLinks.map((item) => (
                <Link
                  key={item.locale}
                  href={item.href}
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    item.locale === locale
                      ? "border-deep-green bg-deep-green text-white"
                      : "border-deep-green/25 text-deep-green"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`language.${item.locale}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
