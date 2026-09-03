"use client";

import {useLayoutEffect} from "react";
import {isRtlLocale, type AppLocale} from "@/i18n/routing";

type DocumentAttributesProps = {
  locale: AppLocale;
};

// useLayoutEffect (not useEffect) so lang/dir are corrected before the browser
// paints — the root layout always ships lang="ar" dir="rtl" (see app/layout.tsx),
// and useEffect's post-paint timing caused a visible RTL-to-LTR flash on every
// non-Arabic page load.
export function DocumentAttributes({locale}: DocumentAttributesProps) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
