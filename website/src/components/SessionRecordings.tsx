import { Cloud, ExternalLink, Play } from "lucide-react";
import type { ResourceLink, YouTubeVideo } from "@/types";
import { YouTubeEmbed } from "@/components/YouTubeCard";
import { getPlatformName, getPrimaryYouTubeEmbed, getYouTubeId } from "@/lib/utils";

interface SessionRecordingsProps {
  recordings: ResourceLink[];
  channelVideos: YouTubeVideo[];
  sessionId: string;
  sessionTitle: string;
}

export default function SessionRecordings({
  recordings,
  channelVideos,
  sessionId,
  sessionTitle,
}: SessionRecordingsProps) {
  const primaryEmbed = getPrimaryYouTubeEmbed(recordings, channelVideos, sessionId);
  const driveRecordings = recordings.filter((r) => r.type === "drive");
  const youtubeRecordings = recordings.filter(
    (r) => r.type === "youtube" || r.type === "video" || getYouTubeId(r.url),
  );

  if (recordings.length === 0 && !primaryEmbed) return null;

  const showEmbed = primaryEmbed && driveRecordings.length === 0;
  const showYoutubeCards =
    driveRecordings.length > 0 && youtubeRecordings.length > 0;
  const multiPart = recordings.length > 1;

  return (
    <section className="mb-12">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <Play className="h-5 w-5 text-red-400" />
        Session Recording{multiPart ? "s" : ""}
      </h2>

      {showEmbed && primaryEmbed && (
        <div className="mb-6">
          <YouTubeEmbed videoId={primaryEmbed.id} title={primaryEmbed.title} />
        </div>
      )}

      {driveRecordings.length > 0 && (
        <div
          className={
            driveRecordings.length > 1
              ? "mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "mb-6 max-w-xl"
          }
        >
          {driveRecordings.map((recording) => (
            <RecordingCard key={recording.url} recording={recording} featured />
          ))}
        </div>
      )}

      {showYoutubeCards && (
        <div className="mb-2">
          <p className="mb-3 text-sm text-slate-500">Also on YouTube</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {youtubeRecordings.map((recording) => (
              <RecordingCard key={recording.url} recording={recording} />
            ))}
          </div>
        </div>
      )}

      {!driveRecordings.length && !showEmbed && youtubeRecordings.length > 0 && (
        <div
          className={
            youtubeRecordings.length > 1
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "max-w-xl"
          }
        >
          {youtubeRecordings.map((recording) => (
            <RecordingCard key={recording.url} recording={recording} />
          ))}
        </div>
      )}

      {recordings.length === 0 && primaryEmbed && (
        <p className="text-sm text-slate-500">
          Watch the {sessionTitle} session on YouTube above.
        </p>
      )}
    </section>
  );
}

function RecordingCard({
  recording,
  featured,
}: {
  recording: ResourceLink;
  featured?: boolean;
}) {
  const isYouTube = recording.type === "youtube" || !!getYouTubeId(recording.url);
  const partMatch = recording.label.match(/part\s*#?\s*(\d+)/i);

  return (
    <a
      href={recording.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass-hover flex flex-col rounded-2xl p-5 ${
        featured ? "border-accent/30 bg-accent/5" : ""
      }`}
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
          {featured && !partMatch && (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
              Main session
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
