import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ChatEntryField } from "@/components/ChatEntryField";
import { getDictionary } from "@/lib/dictionary";

export async function Demo() {
  const { demo } = await getDictionary();

  return (
    <Section id="demo" background="surface" wide>
      <Heading as={2}>{demo.title}</Heading>
      <p className="mt-4 max-w-prose text-azeno-muted">{demo.text}</p>
      <ChatEntryField
        placeholder={demo.placeholder}
        suggestions={demo.suggestions}
        sendAriaLabel={demo.sendAriaLabel}
      />
    </Section>
  );
}
