import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

export async function OMeni() {
  const { about } = await getDictionary();

  return (
    <Section id="o-meni" background="surface" wide>
      <Heading as={2}>{about.title}</Heading>
      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-12">
        <Image
          src="/nejc.jpg"
          alt={about.imageAlt}
          width={1179}
          height={1670}
          className="w-full rounded-lg md:col-span-5"
        />
        <div className="space-y-4 text-azeno-muted md:col-span-7 md:border-l md:border-azeno-line md:pl-12">
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
        </div>
      </div>
    </Section>
  );
}
