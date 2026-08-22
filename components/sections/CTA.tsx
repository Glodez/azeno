import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function CTA() {
  const { cta } = await getDictionary();

  return (
    <Section id="cta" background="white">
      <div className="flex flex-col items-center gap-8 py-12 text-center sm:py-20">
        <p className="text-4xl font-bold tracking-tight text-azeno-navy sm:text-5xl">
          {cta.slogan}
        </p>
        <Heading as={2} className="text-center">
          {cta.title}
        </Heading>
        <Button href="#cta" variant="primary">
          {cta.ctaButton}
        </Button>
      </div>
    </Section>
  );
}
