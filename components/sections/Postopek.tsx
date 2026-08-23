import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function Postopek() {
  const { process: processDict } = await getDictionary();

  return (
    <Section id="postopek" background="white">
      <Heading as={2}>{processDict.title}</Heading>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processDict.steps.map((step, index) => (
          <div key={step.title}>
            <p className="text-3xl font-bold text-azeno-navy">{index + 1}</p>
            <Heading as={3} className="mt-2">
              {step.title}
            </Heading>
            <p className="mt-2 text-azeno-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
