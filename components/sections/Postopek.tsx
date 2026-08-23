import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function Postopek() {
  const { process: processDict } = await getDictionary();

  return (
    <Section id="postopek" background="white">
      <Heading as={2}>{processDict.title}</Heading>
      <div className="mt-10 max-w-2xl">
        {processDict.steps.map((step, index) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-azeno-cyan text-sm font-bold text-azeno-navy">
                {index + 1}
              </span>
              {index < processDict.steps.length - 1 && (
                <span className="my-1 w-0.5 flex-1 bg-azeno-cyan" aria-hidden="true" />
              )}
            </div>
            <div className={index < processDict.steps.length - 1 ? "pb-8" : ""}>
              <Heading as={3} className="mt-2">
                {step.title}
              </Heading>
              <p className="mt-2 text-azeno-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
