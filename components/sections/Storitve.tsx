import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ServiceCard";
import { getDictionary } from "@/lib/dictionary";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
  "aria-hidden": true,
};

// En SVG na storitev, v vrstnem redu iz slovarja — avtomatizacija, dokumenti, chatbot, spletna stran.
const serviceIcons = [
  <svg key="automation" {...iconProps}>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>,
  <svg key="documents" {...iconProps}>
    <path d="M14 2v6h6" />
    <path d="M4 22V4a2 2 0 0 1 2-2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    <path d="m9 15 2 2 4-4" />
  </svg>,
  <svg key="chatbot" {...iconProps}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>,
  <svg key="website" {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
];

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
            icon={serviceIcons[index]}
            className={index === 0 ? "sm:col-span-3" : ""}
          />
        ))}
      </div>
    </Section>
  );
}
