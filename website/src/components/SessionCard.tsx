import { Link } from "react-router-dom";
import { ArrowRight, Code2, FileText, Play } from "lucide-react";
import type { Session } from "@/types";
import { CATEGORY_META } from "@/types";
import PracticeStats from "@/components/PracticeStats";
import { getSessionThumbnail } from "@/lib/utils";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const category = CATEGORY_META[session.category];
  const thumbnail = getSessionThumbnail(session);
  const hasYouTube =
    session.youtubeChannelVideos.length > 0 ||
    session.sessionRecordings.some((v) => v.type === "youtube");
  const hasDrive = session.sessionRecordings.some((v) => v.type === "drive");
  const partCount = session.sessionRecordings.filter((v) =>
    /part\s*#?\s*\d+/i.test(v.label),
  ).length;

  return (
    <Link
      to={`/sessions/${session.id}`}
      className="group glass-hover flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative h-36 overflow-hidden">
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/20 to-transparent" />
          </>
        ) : (
          <div
            className={`flex h-full items-center justify-center bg-gradient-to-br ${category.color}`}
          >
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" aria-hidden />
            <Code2 className="relative h-14 w-14 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
          </div>
        )}
        <span
          className={`absolute left-4 top-4 inline-flex rounded-full bg-gradient-to-r ${category.color} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
        >
          {category.label}
        </span>
        {hasYouTube && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <Play className="h-3 w-3 fill-current" />
            Video
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <PracticeStats stats={session.stats} variant="badges" />
          {hasDrive && (
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
              Drive
            </span>
          )}
          {session.folder.includes("ICPC SCU") && (
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              ICPC SCU
            </span>
          )}
          {partCount > 1 && (
            <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
              {partCount} parts
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-light">
          {session.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-400">
          {session.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-4 text-xs text-slate-500">
          <PracticeStats stats={session.stats} />
          <span className="inline-flex items-center gap-1.5">
            <Play className="h-3.5 w-3.5" />
            {session.stats.videos} videos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {session.stats.articles} articles
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-light">
          View session
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
