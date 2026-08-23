import { Button } from "@/components/ui/Button";
import { CAL_LINK, CAL_NAMESPACE } from "@/lib/config";
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
      type="button"
      variant="primary"
      className={className}
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={JSON.stringify({ layout: "month_view", lang: locale })}
    >
      {label}
    </Button>
  );
}
