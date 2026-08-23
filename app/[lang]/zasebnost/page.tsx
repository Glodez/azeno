import type { ReactElement } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { getDictionary } from "@/lib/dictionary";

type LinkTarget = { match: string; href: string; external?: boolean };
type LinkifyNode = string | ReactElement;

function linkify(text: string, targets: LinkTarget[]): LinkifyNode[] {
  let nodes: LinkifyNode[] = [text];

  targets.forEach((target, targetIndex) => {
    nodes = nodes.flatMap((node) => {
      if (typeof node !== "string") return [node];
      const parts = node.split(target.match);
      if (parts.length === 1) return [node];

      return parts.flatMap((part, index) =>
        index < parts.length - 1
          ? [
              part,
              <a
                key={`${targetIndex}-${index}`}
                href={target.href}
                className="text-azeno-blue hover:underline"
                {...(target.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {target.match}
              </a>,
            ]
          : [part]
      );
    });
  });

  return nodes;
}

const OPENAI_PRIVACY_URL_TEXT = "openai.com/policies/privacy-policy";

export default async function ZasebnostPage() {
  const { privacy, footer } = await getDictionary();
  const email = footer.contactEmail;

  const linkTargets: LinkTarget[] = [
    { match: email, href: `mailto:${email}` },
    { match: OPENAI_PRIVACY_URL_TEXT, href: `https://${OPENAI_PRIVACY_URL_TEXT}`, external: true },
  ];

  return (
    <Section background="white">
      <div className="max-w-prose">
        <Heading as={1}>{privacy.title}</Heading>

        <div className="mt-10 space-y-10 text-azeno-muted">
          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.controller.heading}</h2>
            <p className="mt-2">{linkify(privacy.controller.body, linkTargets)}</p>
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
                <li key={item}>{linkify(item, linkTargets)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.retention.heading}</h2>
            <p className="mt-2">{privacy.retention.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-azeno-navy">{privacy.rights.heading}</h2>
            <p className="mt-2">{linkify(privacy.rights.body, linkTargets)}</p>
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
