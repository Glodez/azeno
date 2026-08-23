import type { ReactNode } from "react";

type SectionBackground = "white" | "surface";

type SectionProps = {
  id?: string;
  background?: SectionBackground;
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-azeno-white",
  surface: "bg-azeno-surface",
};

export function Section({ id, background = "white", wide = false, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={backgroundStyles[background]}
      style={id ? { scrollMarginTop: "calc(var(--nav-height) + 1.5rem)" } : undefined}
    >
      <div className={`mx-auto ${wide ? "max-w-wide" : "max-w-5xl"} px-6 py-16 sm:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}
