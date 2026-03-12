"use client";

import { useLocale, type Locale } from "./context";
import { t } from "./translations";

export function useT() {
  const { locale } = useLocale();
  return (key: Parameters<typeof t>[0]) => t(key, locale);
}

export function pick<T>(map: Record<Locale, T>, locale: Locale): T {
  return map[locale] ?? map.ko;
}

export function usePick() {
  const { locale } = useLocale();
  return <T,>(map: Record<Locale, T>): T => map[locale] ?? map.ko;
}
