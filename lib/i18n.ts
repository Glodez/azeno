export const locales = ["sl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sl";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
