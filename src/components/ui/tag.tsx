import type { Lang } from "@/i18n/ui";

type Props = {
  lang: Lang;
  tag: string;
  selected: boolean;
};

export function Tag({ lang, tag, selected = true }: Props) {
  return (
    <a
      className={`px-3 py-1 text-sm transition-colors ${
        selected ? "font-bold text-slate-950" : "text-slate-600"
      }`}
      href={`/${lang}/tags/${tag.toLowerCase()}`}
    >
      {tag}
    </a>
  );
}
