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
        width: image.width,
        height: image.height,
      })),
    [t],
  );

  return (
    <section id="gallery" className="tv-section bg-white">
      <div className="tv-container">
        <p className="tv-eyebrow">{t("gallery.eyebrow")}</p>
        <h2 className="tv-title mt-3 text-deep-green">{t("gallery.title")}</h2>
        <p className="tv-subtitle mt-4 max-w-2xl">{t("gallery.description")}</p>
        <p className="mt-2 text-sm text-ink/65">{t("gallery.hint")}</p>

        <div className="mt-9 columns-2 gap-4 lg:columns-3">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-deep-green/10 bg-white shadow-md shadow-deep-green/5 focus-visible:tv-focus"
            >
              <Image
                src={image.src}
                alt={t(image.altKey)}
                width={image.width}
                height={image.height}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-deep-green/0 opacity-0 transition duration-300 group-hover:bg-deep-green/25 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 p-3 text-deep-green shadow-lg">
                  <ZoomIn size={20} />
                </span>
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
