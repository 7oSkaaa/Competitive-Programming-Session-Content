import { useParams } from "react-router-dom";
import MarkdownContent from "@/components/MarkdownContent";
import { ExternalLink } from "lucide-react";
import BackLink from "@/components/BackLink";
import ResourceList from "@/components/ResourceList";
import SessionRecordings from "@/components/SessionRecordings";
import YouTubeCard from "@/components/YouTubeCard";
import siteData from "@/data/site-data.json";
import type { SiteData } from "@/types";
import { CATEGORY_META } from "@/types";
import { formatPracticeLabel } from "@/lib/utils";

const data = siteData as SiteData;

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const session = data.sessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-white">Session not found</h1>
        <BackLink label="Back to sessions" className="btn-primary mt-6 inline-flex" />
      </div>
    );
  }

  const category = CATEGORY_META[session.category];
  const recordingUrls = new Set(session.sessionRecordings.map((r) => r.url));

  const problemSections = session.sections.filter((s) =>
    s.links.some((l) => l.type === "problem" || l.type === "sheet"),
  );
  const resourceSections = session.sections.filter(
    (s) =>
      !problemSections.includes(s) &&
      s.links.some((l) => !recordingUrls.has(l.url) && !l.url.startsWith("#")),
  );

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <BackLink
        label="All sessions"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      />

      <header className="mb-10">
        <span
          className={`inline-flex rounded-full bg-gradient-to-r ${category.color} px-3 py-1 text-xs font-semibold text-white`}
        >
          {category.label}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          {session.title}
        </h1>
        <p className="mt-3 text-slate-400">{session.description}</p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <StatPill label={formatPracticeLabel(session.stats.problems, "problem")} />
          <StatPill label={formatPracticeLabel(session.stats.sheets, "sheet")} />
          <StatPill label={`${session.stats.videos} videos`} />
          <StatPill label={`${session.stats.articles} articles`} />
        </div>
      </header>

      <SessionRecordings
        recordings={session.sessionRecordings}
        channelVideos={session.youtubeChannelVideos}
        sessionId={session.id}
        sessionTitle={session.title}
      />

      {session.primaryVideos.length > 0 && (
        <section className="mb-12">
          <h2 className="section-heading mb-4">Extra Videos & Resources</h2>
          <ResourceList links={session.primaryVideos} />
        </section>
      )}

      {session.youtubeChannelVideos.length > 0 &&
        session.sessionRecordings.every((r) => r.type === "drive") && (
          <section className="mb-12">
            <h2 className="section-heading mb-4">YouTube Channel</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {session.youtubeChannelVideos.map((video) => (
                <YouTubeCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

      {problemSections.map((section) => (
        <section key={section.id} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-white">{section.title}</h2>
          <ResourceList links={section.links} />
        </section>
      ))}

      {resourceSections.map((section) => (
        <section key={section.id} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-white">{section.title}</h2>
          <ResourceList
            links={section.links.filter(
              (l) => !recordingUrls.has(l.url) && !l.url.startsWith("#"),
            )}
          />
        </section>
      ))}

      <section className="mt-16 rounded-2xl border border-white/10 bg-surface-overlay/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Full Session Notes</h2>
        <div className="prose-session">
          <MarkdownContent content={session.markdown} />
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <a
          href={`https://github.com/7oSkaaa/Competitive-Programming-Session-Content/tree/main/${encodeURIComponent(session.folder)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          View on GitHub
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
      {label}
    </span>
  );
}
