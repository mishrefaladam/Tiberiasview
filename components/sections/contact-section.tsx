import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {PhoneCall, MessageCircle, BadgeInfo} from "lucide-react";
import type {AppLocale} from "@/i18n/routing";
import {siteConfig} from "@/lib/site-config";

type ContactSectionProps = {
  locale: AppLocale;
};

export async function ContactSection({locale}: ContactSectionProps) {
  const t = await getTranslations({locale});

  return (
    <section className="tv-section pt-0">
      <div className="tv-container">
        <div className="tv-card p-7 md:p-9">
          <p className="tv-eyebrow">{t("contact.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold text-deep-green">{t("contact.title")}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={siteConfig.phoneHref} className="tv-btn-primary">
              <PhoneCall size={16} />
              {t("contact.call")}
            </Link>
            <Link href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full border border-deep-green/20 bg-white px-4 py-2.5 text-sm font-semibold text-deep-green">
              <MessageCircle size={16} className="inline-block" /> {t("contact.whatsapp")}
            </Link>
            <Link href={siteConfig.facebookHref} target="_blank" rel="noopener noreferrer" className="rounded-full border border-deep-green/20 bg-white px-4 py-2.5 text-sm font-semibold text-deep-green">
              <BadgeInfo size={16} className="inline-block" /> {t("contact.facebook")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
