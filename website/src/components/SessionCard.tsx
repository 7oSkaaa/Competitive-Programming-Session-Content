import { Link } from "react-router-dom";
import { ArrowRight, FileText, Play, Target } from "lucide-react";
import type { Session } from "@/types";
import { CATEGORY_META } from "@/types";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const category = CATEGORY_META[session.category];
  const hasYouTube = session.youtubeChannelVideos.length > 0;
  const hasDrive = session.primaryVideos.some((v) => v.type === "drive");

  return (
    <Link
      to={`/sessions/${session.id}`}
      className="group glass-hover flex flex-col rounded-2xl p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full bg-gradient-to-r ${category.color} px-3 py-1 text-xs font-semibold text-white`}
        >
          {category.label}
        </span>
        <div className="flex gap-1.5">
          {hasYouTube && (
            <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400">
              YouTube
            </span>
          )}
          {hasDrive && (
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
              Drive
            </span>
          )}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-light">
        {session.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-400">
        {session.description}
      </p>

      <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5" />
          {session.stats.problems} problems
        </span>
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
    </Link>
  );
}
