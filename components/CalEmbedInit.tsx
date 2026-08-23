"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "@/lib/config";

export function CalEmbedInit() {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      const brandColor =
        getComputedStyle(document.documentElement).getPropertyValue("--azeno-blue").trim() || "#2563c7";

      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
