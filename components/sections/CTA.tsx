import { lang } from "next/root-params";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CalTriggerButton } from "@/components/CalTriggerButton";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function CTA() {
  const locale = (await lang()) as Locale;
  const { cta } = await getDictionary();

  return (
    <Section id="cta" background="white" wide>
      <Heading as={2}>{cta.slogan}</Heading>
      <p className="mt-4 max-w-prose text-lg text-azeno-muted">{cta.title}</p>
      <p className="mt-2 max-w-prose text-azeno-muted">{cta.note}</p>
      <div className="mt-8">
        <CalTriggerButton label={cta.ctaButton} locale={locale} />
      </div>
    </Section>
  );
}
