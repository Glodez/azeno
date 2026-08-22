import Image from "next/image";
import Link from "next/link";
import { lang } from "next/root-params";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/dictionary";

export async function Navbar() {
  const locale = await lang();
  const { nav } = await getDictionary();

  return (
    <header className="border-b border-azeno-line bg-azeno-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
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
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button href="#cta" variant="primary">
            {nav.ctaButton}
          </Button>
        </div>
      </div>
    </header>
  );
}
