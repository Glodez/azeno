import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Section background="white">
        <Heading as={1}>AZENO</Heading>
        <p className="mt-4 max-w-prose text-azeno-muted">
          Ogrodje strani je pripravljeno — vsebina sekcij sledi v naslednji fazi.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#cta" variant="primary">
            Primarni gumb
          </Button>
          <Button href="#cta" variant="secondary">
            Sekundarni gumb
          </Button>
        </div>
      </Section>
      <Section id="cta" background="surface">
        <Heading as={2}>Izmenično ozadje</Heading>
        <p className="mt-4 max-w-prose text-azeno-muted">
          Ta sekcija prikazuje ozadje --azeno-surface, ki se izmenjuje z belim.
        </p>
      </Section>
    </>
  );
}
