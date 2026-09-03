import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {AdminDashboard} from "@/components/admin/admin-dashboard";
import {routing, type AppLocale} from "@/i18n/routing";

type AdminPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: AdminPageProps): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
  const t = await getTranslations({locale: currentLocale});

  return {
    title: t("meta.adminTitle"),
  };
}

export default async function AdminPage({params}: AdminPageProps) {
  const {locale} = await params;
  const currentLocale = (routing.locales.includes(locale as AppLocale)
    ? locale
    : routing.defaultLocale) as AppLocale;

  setRequestLocale(currentLocale);
  const t = await getTranslations({locale: currentLocale});

  return (
    <main className="tv-section">
      <div className="tv-container">
        <h1 className="tv-title text-deep-green">{t("admin.title")}</h1>
        <div className="mt-8">
          <AdminDashboard />
        </div>
      </div>
    </main>
  );
}
