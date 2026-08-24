import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

type DataAttributes = { [key: `data-${string}`]: string };

type ButtonAsLink = { href: string; variant?: ButtonVariant } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
> &
  DataAttributes;

type ButtonAsButton = { href?: undefined; variant?: ButtonVariant } & ComponentPropsWithoutRef<"button"> &
  DataAttributes;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-azeno-blue text-azeno-white hover:bg-azeno-navy hover:shadow-lg hover:shadow-azeno-blue/25",
  secondary:
    "border border-azeno-blue text-azeno-blue hover:border-azeno-navy hover:bg-azeno-surface hover:text-azeno-navy",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    // External URLs (e.g. Cal.com) use a plain <a> — if the booking script
    // never loads, the link still works as a normal navigation.
    if (/^https?:\/\//.test(href)) {
      return <a href={href} className={styles} {...rest} />;
    }
    return <Link href={href} className={styles} {...rest} />;
  }

  return <button className={styles} {...(props as ButtonAsButton)} />;
}
