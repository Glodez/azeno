import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ServiceCard";
import { getDictionary } from "@/lib/dictionary";

export async function Storitve() {
  const { services } = await getDictionary();

  return (
    <Section id="storitve" background="white" wide>
      <Heading as={2}>{services.title}</Heading>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.items.map((item, index) => (
          <ServiceCard
            key={item.title}
            title={item.title}
            description={item.description}
            details={item.details}
            className={index === 0 ? "sm:col-span-3" : ""}
          />
        ))}
      </div>
    </Section>
  );
}
