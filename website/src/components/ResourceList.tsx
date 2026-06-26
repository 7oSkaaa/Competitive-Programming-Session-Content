import { ExternalLink } from "lucide-react";
import type { ResourceLink } from "@/types";
import { getLinkIcon, getPlatformName } from "@/lib/utils";

const TYPE_STYLES: Record<ResourceLink["type"], string> = {
  youtube: "border-red-500/20 bg-red-500/5 hover:border-red-500/40",
  drive: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40",
  problem: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40",
  article: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40",
  sheet: "border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40",
  template: "border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40",
  video: "border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40",
  external: "border-white/10 bg-white/5 hover:border-white/20",
};

interface ResourceListProps {
  links: ResourceLink[];
  compact?: boolean;
}

export default function ResourceList({ links, compact }: ResourceListProps) {
  if (links.length === 0) return null;

  return (
    <ul className={`grid gap-2 ${compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {links.map((link) => (
        <li key={`${link.url}-${link.label}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 rounded-xl border p-3 transition-all ${TYPE_STYLES[link.type]}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/20 text-sm">
              {getLinkIcon(link.type)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white group-hover:text-accent-light">
                {link.label}
              </p>
              <p className="truncate text-xs text-slate-500">
                {getPlatformName(link.url)}
              </p>
            </div>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </li>
      ))}
    </ul>
  );
}
