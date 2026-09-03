import {getTranslations} from "next-intl/server";
import {Camera, Flame, Leaf, Mountain, TentTree, Trees} from "lucide-react";
import type {AppLocale} from "@/i18n/routing";

const featureConfig = [
  {key: "family", icon: TentTree, tone: "bg-deep-green"},
  {key: "kids", icon: Trees, tone: "bg-sunset"},
  {key: "grill", icon: Flame, tone: "bg-deep-green"},
  {key: "view", icon: Mountain, tone: "bg-sunset"},
  {key: "photo", icon: Camera, tone: "bg-deep-green"},
  {key: "nature", icon: Leaf, tone: "bg-sunset"},
] as const;

type FeaturesSectionProps = {
  locale: AppLocale;
};

export async function FeaturesSection({locale}: FeaturesSectionProps) {
  const t = await getTranslations({locale});

  return (
    <section id="facilities" className="tv-section">
      <div className="tv-container">
        <p className="tv-eyebrow">{t("features.eyebrow")}</p>
        <h2 className="tv-title mt-3 text-deep-green">{t("features.title")}</h2>
        <p className="tv-subtitle mt-4 max-w-3xl">{t("features.description")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureConfig.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.key}
                className="tv-card p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-deep-green/10"
                style={{animationDelay: `${index * 80}ms`}}
              >
                <div className={`inline-flex rounded-xl ${item.tone} p-2 text-white`}>
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink">{t(`features.items.${item.key}`)}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
