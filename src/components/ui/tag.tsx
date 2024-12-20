type Props = {
  tag: string;
  selected: boolean;
};

export function Tag({ tag, selected = true }: Props) {
  return (
    <a
      className={`px-3 py-1 text-sm transition-colors ${
        selected ? "font-bold text-slate-950" : "text-slate-600"
      }`}
      href={`/tags/${tag.toLowerCase()}`}
    >
      {tag}
    </a>
  );
}
