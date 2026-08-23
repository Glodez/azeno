import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

function linkifyEmail(text: string, email: string): ReactNode[] {
  const parts = text.split(email);
  if (parts.length === 1) return [text];

  return parts.flatMap((part, index) =>
    index < parts.length - 1
      ? [
          part,
          <a key={index} href={`mailto:${email}`} className="text-azeno-blue hover:underline">
            {email}
          </a>,
        ]
      : [part]
  );
}

export default async function ZasebnostPage() {
  const { privacy, footer } = await getDictionary();
  const email = footer.contactEmail;

  return (
    <Section background="white">
      <div className="max-w-prose">
        <Heading as={1}>{privacy.title}</Heading>

        <div className="mt-10 space-y-10 text-azeno-muted">
          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.controller.heading}</h2>
            <p className="mt-2">{linkifyEmail(privacy.controller.body, email)}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.whatWeCollect.heading}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {privacy.whatWeCollect.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.why.heading}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {privacy.why.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.legalBasis.heading}</h2>
            <p className="mt-2">{privacy.legalBasis.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.processors.heading}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {privacy.processors.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.retention.heading}</h2>
            <p className="mt-2">{privacy.retention.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.rights.heading}</h2>
            <p className="mt-2">{linkifyEmail(privacy.rights.body, email)}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.cookies.heading}</h2>
            <p className="mt-2">{privacy.cookies.body}</p>
          </section>
        </div>
      </div>
    </Section>
  );
}
