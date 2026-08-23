import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionaryForLocale } from "@/lib/dictionary";
import { hasLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const alt = "AZENO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/azeno-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: localeParam } = await params;
  const locale: Locale = hasLocale(localeParam) ? localeParam : defaultLocale;
  const { cta } = getDictionaryForLocale(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          backgroundColor: "#ffffff",
        }}
      >
        <img src={logoSrc} width={460} height={331} alt="" />
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#232a7a",
          }}
        >
          {cta.slogan}
        </div>
      </div>
    ),
    { ...size }
  );
}
