import { lang } from "next/root-params";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ChatEntryField } from "@/components/ChatEntryField";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export async function Demo() {
  const locale = (await lang()) as Locale;
  const { demo, chat } = await getDictionary();

  return (
    <Section id="demo" background="surface" wide>
      <Heading as={2}>{demo.title}</Heading>
      <p className="mt-4 max-w-prose text-azeno-muted">{demo.text}</p>
      <ChatEntryField
        placeholder={demo.placeholder}
        suggestions={demo.suggestions}
        sendAriaLabel={demo.sendAriaLabel}
        privacyText={chat.privacyText}
        privacyLinkLabel={chat.privacyLinkLabel}
        privacyHref={`/${locale}/zasebnost`}
      />
    </Section>
  );
}
