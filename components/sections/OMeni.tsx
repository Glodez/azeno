import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function OMeni() {
  const { about } = await getDictionary();

  return (
    <Section id="o-meni" background="surface" wide>
      <Heading as={2}>{about.title}</Heading>
      <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
        <Image
          src="/nejc.jpg"
          alt={about.imageAlt}
          width={1179}
          height={1670}
          className="w-full rounded-lg md:w-[26rem] md:shrink-0"
        />
        <div className="max-w-prose space-y-4 text-azeno-muted">
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
        </div>
      </div>
    </Section>
  );
}
