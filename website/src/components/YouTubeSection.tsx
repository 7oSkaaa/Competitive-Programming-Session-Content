import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import YouTubeCard from "@/components/YouTubeCard";
import siteData from "@/data/site-data.json";
import type { SiteData } from "@/types";

const data = siteData as SiteData;

export default function YouTubeSection() {
  const videos = data.youtubeVideos;

  if (videos.length === 0) return null;

  return (
    <section
      id="youtube-sessions"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-red-400">
            @7oSkaa on YouTube
          </p>
          <h2 className="section-heading mt-1">YouTube Sessions</h2>
          <p className="mt-2 max-w-xl text-slate-400">
            Watch CP Circus and session recordings on Ahmed Hossam&apos;s channel.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/youtube" className="btn-ghost">
            View all {videos.length} videos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={data.config.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open Channel
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <YouTubeCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
