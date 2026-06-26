import { Cloud, ExternalLink, Play } from "lucide-react";
import type { ResourceLink, YouTubeVideo } from "@/types";
import { YouTubeEmbed } from "@/components/YouTubeCard";
import { getPlatformName, getYouTubeId } from "@/lib/utils";

interface SessionRecordingsProps {
  recordings: ResourceLink[];
  channelVideos: YouTubeVideo[];
  sessionTitle: string;
}

export default function SessionRecordings({
  recordings,
  channelVideos,
  sessionTitle,
}: SessionRecordingsProps) {
  const hasDrive = recordings.some((r) => r.type === "drive");
  const youtubeRecording = recordings.find(
    (r) => (r.type === "youtube" || r.type === "video") && getYouTubeId(r.url),
  );
  const embedId =
    !hasDrive && youtubeRecording
      ? getYouTubeId(youtubeRecording.url)
      : !hasDrive && recordings.length === 0 && channelVideos[0]
        ? channelVideos[0].id
        : null;

  if (recordings.length === 0 && !embedId) return null;

  const multiPart = recordings.length > 1;

  return (
    <section className="mb-12">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <Play className="h-5 w-5 text-red-400" />
        Session Recording{multiPart ? "s" : ""}
      </h2>

      {embedId && (
        <div className="mb-6">
          <YouTubeEmbed
            videoId={embedId}
            title={youtubeRecording?.label ?? channelVideos[0]?.title ?? sessionTitle}
          />
        </div>
      )}

      {recordings.length > 0 && (
        <div
          className={
            multiPart
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "max-w-xl"
          }
        >
          {recordings.map((recording) => (
            <RecordingCard key={recording.url} recording={recording} />
          ))}
        </div>
      )}
    </section>
  );
}

function RecordingCard({ recording }: { recording: ResourceLink }) {
  const isYouTube = recording.type === "youtube" || !!getYouTubeId(recording.url);
  const partMatch = recording.label.match(/part\s*#?\s*(\d+)/i);

  return (
    <a
      href={recording.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-hover flex flex-col rounded-2xl p-5"
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isYouTube ? "bg-red-500/15 text-red-400" : "bg-blue-500/15 text-blue-400"
          }`}
        >
          {isYouTube ? (
            <Play className="h-5 w-5 fill-current" />
          ) : (
            <Cloud className="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0">
          {partMatch && (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
              Part {partMatch[1]}
            </span>
          )}
          <p className="truncate font-display font-semibold text-white group-hover:text-accent-light">
            {recording.label}
          </p>
          <p className="text-xs text-slate-500">{getPlatformName(recording.url)}</p>
        </div>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-light">
        Open recording
        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
      </span>
    </a>
  );
}
