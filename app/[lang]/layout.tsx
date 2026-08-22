import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "AZENO — Vaš korak v prihodnost.",
  description: "AI avtomatizacija za mala in srednje velika podjetja.",
};

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${fontSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex flex-1 flex-col">{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}
