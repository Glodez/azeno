import Image from "next/image";
import Link from "next/link";
import dictionary from "@/dictionaries/sl.json";

export function Footer() {
  const { footer } = dictionary;
  const copyright = footer.copyright.replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="border-t border-azeno-line bg-azeno-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-azeno-muted sm:flex-row sm:justify-between">
        <Image
          src="/azeno-logo-slogan.png"
          alt={footer.logoAlt}
          width={672}
          height={449}
          className="h-12 w-auto"
        />
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p>{copyright}</p>
          <p>
            {footer.contactLabel}{" "}
            <a href={`mailto:${footer.contactEmail}`} className="text-azeno-blue hover:underline">
              {footer.contactEmail}
            </a>
          </p>
          <Link href="/zasebnost" className="text-azeno-blue hover:underline">
            {footer.privacyLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
