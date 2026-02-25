import type { Dictionary } from "./types";

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default as Dictionary),
  fr: () => import("./fr.json").then((m) => m.default as Dictionary),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
