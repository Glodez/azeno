"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  sl: "SL",
  en: "EN",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1];
  const restOfPath = segments.slice(2);

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const href = `/${[locale, ...restOfPath].join("/")}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "text-azeno-blue" : "text-azeno-muted hover:text-azeno-blue"}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
