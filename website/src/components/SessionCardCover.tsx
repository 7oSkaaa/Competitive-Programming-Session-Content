import {
  Cloud,
  GraduationCap,
  Play,
  Target,
  Video,
  Zap,
} from "lucide-react";
import type { Session } from "@/types";
import { CATEGORY_META } from "@/types";
import { getSessionIcon } from "@/lib/sessionIcons";

interface SessionCardCoverProps {
  session: Session;
  hasYouTube: boolean;
  hasDrive: boolean;
}

export default function SessionCardCover({
  session,
  hasYouTube,
  hasDrive,
}: SessionCardCoverProps) {
  const category = CATEGORY_META[session.category];
  const Icon = getSessionIcon(session.id, session.category);
  const initials = session.title
    .split(/\s+/)
    .filter((word) => word.length > 1 && !/^(the|and|in|of|to|a)$/i.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative h-32 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <Icon
        className="pointer-events-none absolute -bottom-3 -right-2 h-28 w-28 text-white/15"
        strokeWidth={1.25}
        aria-hidden
      />
      {initials && (
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-bold tracking-tight text-white/10"
          aria-hidden
        >
          {initials}
        </span>
      )}

      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
          {category.label}
        </span>

        <div className="flex items-end justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 backdrop-blur-sm ring-1 ring-white/10">
              <Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div className="hidden min-[380px]:flex items-center gap-1.5 text-[10px] font-medium text-white/80">
              {session.stats.problems > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-black/20 px-1.5 py-0.5 backdrop-blur-sm">
                  <Target className="h-3 w-3" />
                  {session.stats.problems}
                </span>
              )}
              {session.stats.videos > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-black/20 px-1.5 py-0.5 backdrop-blur-sm">
                  <Video className="h-3 w-3" />
                  {session.stats.videos}
                </span>
              )}
              {session.stats.sheets > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-black/20 px-1.5 py-0.5 backdrop-blur-sm">
                  <Zap className="h-3 w-3" />
                  {session.stats.sheets}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-1.5">
            {hasYouTube && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                <Play className="h-3 w-3 fill-current" />
                YouTube
              </span>
            )}
            {hasDrive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                <Cloud className="h-3 w-3" />
                Drive
              </span>
            )}
            {session.folder.includes("ICPC SCU") && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/30 px-2.5 py-1 text-[10px] font-medium text-emerald-100 backdrop-blur-sm">
                <GraduationCap className="h-3 w-3" />
                ICPC SCU
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
