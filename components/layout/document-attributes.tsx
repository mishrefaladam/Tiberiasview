"use client";

import {useEffect} from "react";
import {isRtlLocale, type AppLocale} from "@/i18n/routing";

type DocumentAttributesProps = {
  locale: AppLocale;
};

export function DocumentAttributes({locale}: DocumentAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
