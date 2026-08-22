import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function CTA() {
  const { cta } = await getDictionary();

  return (
    <Section id="cta" background="white">
      <Heading as={2}>{cta.slogan}</Heading>
      <p className="mt-4 text-lg text-azeno-muted">{cta.title}</p>
      <div className="mt-8">
        <Button href="#cta" variant="primary">
          {cta.ctaButton}
        </Button>
      </div>
    </Section>
  );
}
