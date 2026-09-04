// Falls back to the real production domain (not localhost) so a deployment that
// forgets to set NEXT_PUBLIC_SITE_URL never leaks "localhost" into shared links,
// metadata, or the sitemap. Local dev should set it via .env.local when needed.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiberiasview.com";

export const siteConfig = {
  name: "Tiberias View",
  arabicName: "متنزه واستراحة بحيرة طبريا - صما",
  // Used in the header logo lockup, where the "- صما" suffix is dropped.
  arabicNameShort: "متنزه واستراحة بحيرة طبريا",
  phoneDisplay: "+962 7 7225 6108",
  phoneHref: "tel:+962772256108",
  whatsappDisplay: "+962772256108",
  whatsappHref: "https://wa.me/962772256108",
  facebookHref: "https://facebook.com/TiberiasView",
  locationAr: "منتزه اطلالة طبريا، صما، الأردن",
  locationEn: "Tiberias View Park, Samma, Jordan",
  mapsQuery: "32.5993442,35.635033",
} as const;

export const galleryImages = [
  {
    src: "/images/hero-sunset.jpg",
    altKey: "gallery.heroSunsetAlt",
    width: 1177,
    height: 1577,
  },
  {
    src: "/images/park-grounds-daylight.jpg",
    altKey: "gallery.parkGroundsAlt",
    width: 2048,
    height: 755,
  },
  {
    src: "/images/heart-view.jpg",
    altKey: "gallery.heartViewAlt",
    width: 1206,
    height: 1583,
  },
  {
    src: "/images/fountain-terrace.jpg",
    altKey: "gallery.fountainTerraceAlt",
    width: 1180,
    height: 1545,
  },
  {
    src: "/images/sunset-arch-view.jpg",
    altKey: "gallery.sunsetArchAlt",
    width: 922,
    height: 1892,
  },
  {
    src: "/images/garden-fountain-detail.jpg",
    altKey: "gallery.gardenDetailAlt",
    width: 1170,
    height: 1577,
  },
  {
    src: "/images/night-view-terrace.jpg",
    altKey: "gallery.nightViewAlt",
    width: 2048,
    height: 755,
  },
  {
    src: "/images/fountain-evening.jpg",
    altKey: "gallery.fountainEveningAlt",
    width: 950,
    height: 1600,
  },
  {
    src: "/images/pergola-seating-dusk.jpg",
    altKey: "gallery.pergolaAlt",
    width: 1536,
    height: 2048,
  },
  {
    src: "/images/heart-photo-spot-family.jpg",
    altKey: "gallery.heartFamilyAlt",
    width: 922,
    height: 1679,
  },
] as const;

export const reservationTypeOptions = [
  "family_visit",
  "grill_area",
  "group_visit",
  "special_occasion",
  "other",
] as const;
