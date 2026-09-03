export const siteConfig = {
  name: "Tiberias View",
  arabicName: "متنزه واستراحة بحيرة طبريا - صما",
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
  },
  {
    src: "/images/heart-view.jpg",
    altKey: "gallery.heartViewAlt",
  },
  {
    src: "/images/fountain-terrace.jpg",
    altKey: "gallery.fountainTerraceAlt",
  },
] as const;

export const reservationTypeOptions = [
  "family_visit",
  "grill_area",
  "group_visit",
  "special_occasion",
  "other",
] as const;
