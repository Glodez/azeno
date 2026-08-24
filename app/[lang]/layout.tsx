import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chat } from "@/components/Chat";
import { ChatWidgetProvider } from "@/components/chat-context";
import { CalEmbedInit } from "@/components/CalEmbedInit";
import { hasLocale, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getDictionary, getDictionaryForLocale } from "@/lib/dictionary";
import { SITE_URL } from "@/lib/config";
import "../globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: localeParam } = await params;
  const locale: Locale = hasLocale(localeParam) ? localeParam : defaultLocale;
  const { metadata } = getDictionaryForLocale(locale);

  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`]));

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "AZENO",
      locale: locale === "sl" ? "sl_SI" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { chat } = await getDictionary();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fontSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <CalEmbedInit />
        <ChatWidgetProvider locale={locale} dict={chat}>
          <Navbar />
          <main className="flex flex-1 flex-col">{props.children}</main>
          <Footer />
          <Chat locale={locale} dict={chat} privacyHref={`/${locale}/zasebnost`} />
        </ChatWidgetProvider>
      </body>
    </html>
  );
}
