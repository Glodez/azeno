"use client";

import { useId, useState, type ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";

export function ServiceCard({
  title,
  description,
  details,
  icon,
  className = "",
}: {
  title: string;
  description: string;
  details: string;
  icon: ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={`rounded-lg border border-azeno-line bg-azeno-white transition-colors duration-200 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-start justify-between gap-4 rounded-lg p-6 text-left transition-colors duration-200 hover:bg-azeno-surface"
      >
        <div className="flex gap-4">
          <span className="mt-1 shrink-0 text-azeno-blue" aria-hidden="true">
            {icon}
          </span>
          <div>
            <Heading as={3}>{title}</Heading>
            <p className="mt-2 max-w-prose text-azeno-muted">{description}</p>
          </div>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className={`mt-1 h-5 w-5 shrink-0 text-azeno-blue transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose border-t border-azeno-line px-6 pt-4 pb-6 text-azeno-muted">{details}</p>
        </div>
      </div>
    </div>
  );
}
