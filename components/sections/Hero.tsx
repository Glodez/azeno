import { lang } from "next/root-params";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CalTriggerButton } from "@/components/CalTriggerButton";
import { ChatEntryField } from "@/components/ChatEntryField";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function Hero() {
  const locale = (await lang()) as Locale;
  const { hero, demo, chat } = await getDictionary();

  return (
    <Section background="white" wide>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Heading as={1}>{hero.title}</Heading>
          <p className="mt-4 max-w-prose text-lg text-azeno-muted">{hero.subtitle}</p>
          <div className="mt-8">
            <CalTriggerButton label={hero.ctaButton} locale={locale} />
          </div>
        </div>
        <ChatEntryField
          placeholder={demo.placeholder}
          suggestions={demo.suggestions}
          sendAriaLabel={demo.sendAriaLabel}
          privacyText={chat.privacyText}
          privacyLinkLabel={chat.privacyLinkLabel}
          privacyHref={`/${locale}/zasebnost`}
          className="w-full"
        />
      </div>
    </Section>
  );
}
