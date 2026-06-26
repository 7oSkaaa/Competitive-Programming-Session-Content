import type { SessionCategory } from "@/types";
import { CATEGORY_META } from "@/types";

interface CategoryFilterProps {
  selected: SessionCategory | "all";
  onChange: (category: SessionCategory | "all") => void;
  counts: Record<SessionCategory | "all", number>;
}

export default function CategoryFilter({
  selected,
  onChange,
  counts,
}: CategoryFilterProps) {
  const categories = Object.entries(CATEGORY_META) as [
    SessionCategory,
    (typeof CATEGORY_META)[SessionCategory],
  ][];

  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label="All"
        count={counts.all}
        active={selected === "all"}
        onClick={() => onChange("all")}
      />
      {categories.map(([id, meta]) => (
        <FilterChip
          key={id}
          label={meta.label}
          count={counts[id]}
          active={selected === id}
          onClick={() => onChange(id)}
          gradient={meta.color}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  gradient,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  gradient?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? gradient
            ? `border-transparent bg-gradient-to-r ${gradient} text-white shadow-lg`
            : "border-accent/50 bg-accent/20 text-accent-light"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-xs ${
          active ? "bg-black/20" : "bg-white/10"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
