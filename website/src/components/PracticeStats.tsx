import { ClipboardList, Target } from "lucide-react";
import type { SessionStats } from "@/types";
import { formatPracticeLabel } from "@/lib/utils";

interface PracticeStatsProps {
  stats: SessionStats;
  variant?: "inline" | "badges";
}

export default function PracticeStats({
  stats,
  variant = "inline",
}: PracticeStatsProps) {
  if (variant === "badges") {
    return (
      <>
        {stats.problems > 0 && (
          <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
            {formatPracticeLabel(stats.problems, "problem")}
          </span>
        )}
        {stats.sheets > 0 && (
          <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
            {formatPracticeLabel(stats.sheets, "sheet")}
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <span className="inline-flex items-center gap-1.5">
        <Target className="h-3.5 w-3.5" />
        {formatPracticeLabel(stats.problems, "problem")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClipboardList className="h-3.5 w-3.5" />
        {formatPracticeLabel(stats.sheets, "sheet")}
      </span>
    </>
  );
}
