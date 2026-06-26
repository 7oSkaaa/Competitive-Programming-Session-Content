import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import YouTubeCard from "@/components/YouTubeCard";
import siteData from "@/data/site-data.json";
import type { SiteData } from "@/types";

const data = siteData as SiteData;

export default function YouTubePage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return data.youtubeVideos;
    return data.youtubeVideos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        data.sessions.some(
          (s) =>
            s.youtubeChannelVideos.some((yv) => yv.id === v.id) &&
            s.title.toLowerCase().includes(q),
        ),
    );
  }, [search]);

  const sessionMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const session of data.sessions) {
      for (const video of session.youtubeChannelVideos) {
        const existing = map.get(video.id) ?? [];
        existing.push(session.title);
        map.set(video.id, existing);
      }
    }
    return map;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            YouTube Sessions
          </h1>
          <p className="mt-2 max-w-xl text-slate-400">
            Watch sessions from{" "}
            <a
              href={data.config.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:underline"
            >
              @{data.config.handle}
            </a>{" "}
            — CP Circus and more.
          </p>
        </div>
        <a
          href={data.config.youtubeChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shrink-0"
        >
          Open Channel
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search videos..."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video, i) => (
          <div key={video.id} className="relative">
            <YouTubeCard video={video} featured={i === 0 && !search} />
            {sessionMap.get(video.id) && (
              <div className="mt-2 flex flex-wrap gap-1.5 px-1">
                {sessionMap.get(video.id)!.map((title) => (
                  <span
                    key={title}
                    className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent-light"
                  >
                    {title}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl py-16 text-center text-slate-400">
          No videos match your search.
        </div>
      )}
    </div>
  );
}
