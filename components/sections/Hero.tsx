import { lang } from "next/root-params";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CalTriggerButton } from "@/components/CalTriggerButton";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function Hero() {
  const locale = (await lang()) as Locale;
  const { hero } = await getDictionary();

  return (
    <Section background="white">
      <Heading as={1}>{hero.title}</Heading>
      <p className="mt-4 max-w-2xl text-lg text-azeno-muted">{hero.subtitle}</p>
      <div className="mt-8">
        <CalTriggerButton label={hero.ctaButton} locale={locale} />
      </div>
    </Section>
  );
}
