import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/dictionary";

export default async function Home() {
  const { home } = await getDictionary();

  return (
    <>
      <Section background="white">
        <Heading as={1}>{home.title}</Heading>
        <p className="mt-4 max-w-prose text-azeno-muted">{home.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#cta" variant="primary">
            {home.primaryButton}
          </Button>
          <Button href="#cta" variant="secondary">
            {home.secondaryButton}
          </Button>
        </div>
      </Section>
      <Section id="cta" background="surface">
        <Heading as={2}>{home.altBackgroundTitle}</Heading>
        <p className="mt-4 max-w-prose text-azeno-muted">{home.altBackgroundDescription}</p>
      </Section>
    </>
  );
}
