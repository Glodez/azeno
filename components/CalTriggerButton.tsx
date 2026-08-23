import { Button } from "@/components/ui/Button";
import { CAL_URL, getCalTriggerProps } from "@/lib/config";
import type { Locale } from "@/lib/i18n";

export function CalTriggerButton({
  label,
  locale,
  className,
}: {
  label: string;
  locale: Locale;
  className?: string;
}) {
  return (
    <Button
      href={CAL_URL}
      target="_blank"
      rel="noopener"
      variant="primary"
      className={className}
      {...getCalTriggerProps(locale)}
    >
      {label}
    </Button>
  );
}
