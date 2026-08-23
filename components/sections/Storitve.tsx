import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function Storitve() {
  const { services } = await getDictionary();

  return (
    <Section id="storitve" background="white">
      <Heading as={2}>{services.title}</Heading>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-azeno-line bg-azeno-white p-6">
            <Heading as={3}>{item.title}</Heading>
            <p className="mt-2 text-azeno-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
