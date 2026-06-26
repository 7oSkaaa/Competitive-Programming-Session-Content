import { Play } from "lucide-react";
import type { YouTubeVideo } from "@/types";
import { formatDate } from "@/lib/utils";

interface YouTubeCardProps {
  video: YouTubeVideo;
  featured?: boolean;
}

export default function YouTubeCard({ video, featured }: YouTubeCardProps) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass-hover block overflow-hidden rounded-2xl ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-surface-overlay">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-xl">
            <Play className="h-6 w-6 fill-white text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-medium text-white group-hover:text-accent-light">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500">{formatDate(video.publishedAt)}</p>
      </div>
    </a>
  );
}

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
