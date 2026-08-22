import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-azeno-line bg-azeno-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-azeno-muted sm:flex-row sm:justify-between">
        <Image
          src="/azeno-logo-slogan.jpg"
          alt="AZENO — Vaš korak v prihodnost."
          width={180}
          height={60}
          className="h-12 w-auto"
        />
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p>&copy; {new Date().getFullYear()} AZENO</p>
          <Link href="/zasebnost" className="text-azeno-blue hover:underline">
            Politika zasebnosti
          </Link>
        </div>
      </div>
    </footer>
  );
}
