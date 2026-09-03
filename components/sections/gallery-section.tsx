"use client";

import {useMemo, useState} from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import {useTranslations} from "next-intl";
import {ZoomIn} from "lucide-react";
import {galleryImages} from "@/lib/site-config";

export function GallerySection() {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(-1);

  const slides = useMemo(
    () =>
      galleryImages.map((image) => ({
        src: image.src,
        alt: t(image.altKey),
      })),
    [t],
  );

  return (
    <section id="gallery" className="tv-section">
      <div className="tv-container">
        <p className="tv-eyebrow">{t("gallery.eyebrow")}</p>
        <h2 className="tv-title mt-3 text-deep-green">{t("gallery.title")}</h2>
        <p className="tv-subtitle mt-4 max-w-2xl">{t("gallery.description")}</p>
        <p className="mt-2 text-sm text-ink/65">{t("gallery.hint")}</p>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group overflow-hidden rounded-2xl border border-deep-green/10 bg-white shadow-md shadow-deep-green/5 focus-visible:tv-focus ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={image.src}
                  alt={t(image.altKey)}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 40vw"}
                  className="object-cover transition duration-300 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-deep-green/0 opacity-0 transition duration-300 group-hover:bg-deep-green/25 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 p-3 text-deep-green shadow-lg">
                    <ZoomIn size={20} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Lightbox
          open={activeIndex >= 0}
          close={() => setActiveIndex(-1)}
          index={activeIndex < 0 ? 0 : activeIndex}
          slides={slides}
          carousel={{
            finite: true,
          }}
          controller={{
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
        />
      </div>
    </section>
  );
}