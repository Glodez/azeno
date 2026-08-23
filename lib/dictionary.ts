import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import sl from "@/dictionaries/sl.json";
import en from "@/dictionaries/en.json";

const dictionaries = { sl, en };

export function getDictionaryForLocale(locale: Locale) {
  return dictionaries[locale];
}

export async function getDictionary() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return getDictionaryForLocale(locale);
}
