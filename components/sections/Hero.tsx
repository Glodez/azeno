import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function Hero() {
  const { hero } = await getDictionary();

  return (
    <Section background="white">
      <Heading as={1}>{hero.title}</Heading>
      <p className="mt-4 max-w-2xl text-lg text-azeno-muted">{hero.subtitle}</p>
      <div className="mt-8">
        <Button href="#cta" variant="primary">
          {hero.ctaButton}
        </Button>
      </div>
    </Section>
  );
}
