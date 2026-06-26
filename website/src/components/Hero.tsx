import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  ExternalLink,
  Play,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import siteData from "@/data/site-data.json";
import type { SiteData } from "@/types";

const data = siteData as SiteData;

export default function Hero() {
  const totalProblems = data.sessions.reduce((s, x) => s + x.stats.problems, 0);
  const totalSheets = data.sessions.reduce((s, x) => s + x.stats.sheets, 0);
  const totalVideos = data.youtubeVideos.length;

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
              <Sparkles className="h-3.5 w-3.5" />
              Competitive Programming Sessions
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master CP with{" "}
              <span className="gradient-text">organized sessions</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              {data.config.description} Curated by{" "}
              <a
                href={data.config.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-slate-200 transition-colors hover:text-accent-light"
              >
                {data.config.author}
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>{" "}
              — videos, problem sheets, articles, and everything you need to level up.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#youtube-sessions" className="btn-primary">
                <Play className="h-4 w-4" />
                YouTube Sessions
              </a>
              <a href="#sessions" className="btn-ghost">
                Browse Sessions
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/youtube" className="btn-ghost">
                All Videos
              </Link>
              <a
                href={data.config.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <User className="h-4 w-4" />
                About Me
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-80 animate-stagger">
            <StatCard icon={BookOpen} value={data.sessions.length} label="Sessions" />
            <StatCard icon={Target} value={totalProblems} label="Problems" />
            <StatCard icon={ClipboardList} value={totalSheets} label="Sheets" />
            <StatCard icon={Play} value={totalVideos} label="YT Videos" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: typeof BookOpen;
  value: string | number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass-hover rounded-2xl p-5 ${accent ? "border-accent/20 bg-accent/5" : ""}`}
    >
      <Icon
        className={`mb-3 h-5 w-5 ${accent ? "text-accent-light" : "text-slate-400"}`}
      />
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
