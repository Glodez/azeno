import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3;

type HeadingProps = {
  as?: HeadingLevel;
  className?: string;
  children: ReactNode;
};

const sizesByLevel: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]",
  2: "text-3xl sm:text-4xl font-bold tracking-tight",
  3: "text-xl sm:text-2xl font-semibold tracking-tight",
};

const tagByLevel: Record<HeadingLevel, "h1" | "h2" | "h3"> = {
  1: "h1",
  2: "h2",
  3: "h3",
};

export function Heading({ as = 2, className = "", children }: HeadingProps) {
  const Tag = tagByLevel[as];
  return (
    <>
      <Tag className={`${sizesByLevel[as]} text-azeno-navy ${className}`}>{children}</Tag>
      {as === 2 && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mt-3 text-azeno-cyan"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      )}
    </>
  );
}
