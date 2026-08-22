import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="border-b border-azeno-line bg-azeno-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/azeno-logo.jpg"
            alt="AZENO"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <Button href="#cta" variant="primary">
          Rezervirajte posvet
        </Button>
      </div>
    </header>
  );
}
