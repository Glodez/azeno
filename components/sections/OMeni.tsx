import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function OMeni() {
  const { about } = await getDictionary();

  return (
    <Section id="o-meni" background="surface">
      <Heading as={2}>{about.title}</Heading>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        <Image
          src="/nejc.jpg"
          alt={about.imageAlt}
          width={1179}
          height={1670}
          className="w-full max-w-xs rounded-lg md:col-span-1 md:max-w-none"
        />
        <div className="space-y-4 text-azeno-muted md:col-span-2">
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
        </div>
      </div>
    </Section>
  );
}
