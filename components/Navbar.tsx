import Image from "next/image";
import Link from "next/link";
import { lang } from "next/root-params";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavMenu } from "@/components/NavMenu";
import { getDictionary } from "@/lib/dictionary";
import { CAL_LINK, CAL_NAMESPACE } from "@/lib/config";

export async function Navbar() {
  const locale = await lang();
  const { nav } = await getDictionary();

  return (
    <header className="sticky top-0 z-40 border-b border-azeno-line bg-azeno-white">
      <div className="mx-auto flex max-w-wide items-center justify-between gap-4 px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/azeno-logo.png"
            alt="AZENO"
            width={601}
            height={432}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-8">
          <NavMenu items={nav.items} menuOpenLabel={nav.menuOpenLabel} menuCloseLabel={nav.menuCloseLabel} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-namespace={CAL_NAMESPACE}
              data-cal-config={JSON.stringify({ layout: "month_view", lang: locale })}
              className="text-sm font-medium text-azeno-blue hover:underline"
            >
              {nav.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
