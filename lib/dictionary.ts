import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import sl from "@/dictionaries/sl.json";
import en from "@/dictionaries/en.json";

const dictionaries = { sl, en };

export async function getDictionary() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale];
}
