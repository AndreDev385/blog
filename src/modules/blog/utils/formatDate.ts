import type { Lang } from "@/i18n/ui";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

export function formatDate(date: Date, lang: Lang): string {
  return format(date, "dd/MM/yyyy", {
    locale: lang == "es" ? es : enUS,
  });
}
