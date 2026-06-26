import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Session, SiteData, YouTubeVideo } from "../src/types/index.ts";
import {
  FOLDER_CATEGORY,
  FOLDER_ORDER,
  flattenLinks,
  buildSessionDescription,
  computeSessionStats,
  getSessionRecordings,
  getSupplementaryVideos,
  getYouTubeId,
  matchYouTubeVideos,
  parseMarkdownSections,
  SESSION_YOUTUBE_MAP,
  slugify,
} from "../src/lib/utils.ts";
import { normalizeMarkdownForRender } from "../src/lib/markdown.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUTPUT = path.resolve(__dirname, "../src/data/site-data.json");

const YOUTUBE_CHANNEL_ID = "UCfq-WLktMVvKpZJfvz0EM3Q";
const SESSION_DIRS = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "website")
  .map((d) => d.name);

function findReadme(folder: string): string | null {
  const dir = path.join(ROOT, folder);
  for (const name of ["readme.md", "README.md"]) {
    const file = path.join(dir, name);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
  const res = await fetch(url);
  const fromRss: YouTubeVideo[] = [];

  if (res.ok) {
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);

    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !published) continue;

      fromRss.push({
        id,
        title: decodeXml(title),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: published,
      });
    }
  } else {
    console.warn("Could not fetch YouTube RSS feed");
  }

  return fromRss;
}

async function fetchVideoMeta(
  videoId: string,
  requireAuthor = false,
): Promise<YouTubeVideo | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { title: string; author_name: string };
    if (
      requireAuthor &&
      !data.author_name.includes("Ahmed Hossam") &&
      !data.author_name.includes("7oSkaa")
    ) {
      return null;
    }
    return {
      id: videoId,
      title: data.title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: "",
    };
  } catch {
    return null;
  }
}

async function enrichYouTubeFromSessions(
  sessions: Session[],
  rssVideos: YouTubeVideo[],
): Promise<YouTubeVideo[]> {
  const known = new Map(rssVideos.map((v) => [v.id, v]));
  const mappedIds = new Set(Object.values(SESSION_YOUTUBE_MAP).flat());

  for (const id of mappedIds) {
    if (known.has(id)) continue;
    const video = await fetchVideoMeta(id, false);
    if (video) known.set(id, video);
  }

  for (const session of sessions) {
    for (const link of session.sessionRecordings) {
      if (link.type !== "youtube") continue;
      const id = getYouTubeId(link.url);
      if (!id || known.has(id)) continue;
      const video = await fetchVideoMeta(id, true);
      if (video) known.set(id, video);
    }
  }

  return [...known.values()].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || ""),
  );
}

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function buildSession(folder: string, youtubeVideos: YouTubeVideo[]): Session {
  const readmePath = findReadme(folder)!;
  const markdown = fs.readFileSync(readmePath, "utf-8");
  const { title, sections } = parseMarkdownSections(markdown);
  const id = slugify(title || folder);
  const allLinks = flattenLinks(sections);
  const sessionRecordings = getSessionRecordings(sections);
  const primaryVideos = getSupplementaryVideos(allLinks, sessionRecordings);
  const counts = computeSessionStats(allLinks);

  const matchedYoutube = matchYouTubeVideos(id, title || folder, youtubeVideos);

  return {
    id,
    title: title || folder,
    folder,
    category: FOLDER_CATEGORY[folder] ?? "misc",
    tags: deriveTags(folder, sections),
    description: buildSessionDescription(title || folder, sections, markdown, folder),
    sections,
    sessionRecordings,
    primaryVideos,
    youtubeChannelVideos: matchedYoutube,
    stats: counts,
    markdown: normalizeMarkdownForRender(markdown),
  };
}

function deriveTags(folder: string, sections: { title: string }[]): string[] {
  const tags = new Set<string>();
  const category = FOLDER_CATEGORY[folder];
  if (category) tags.add(category);

  for (const section of sections) {
    const t = section.title.toLowerCase();
    if (t.includes("video")) tags.add("videos");
    if (t.includes("problem")) tags.add("problems");
    if (t.includes("article")) tags.add("articles");
    if (t.includes("sheet")) tags.add("sheets");
  }

  return [...tags];
}

async function main() {
  console.log("Generating site content...");
  const youtubeRss = await fetchYouTubeVideos();
  console.log(`Fetched ${youtubeRss.length} YouTube videos from RSS`);

  const orderedFolders = [
    ...FOLDER_ORDER.filter((f) => SESSION_DIRS.includes(f)),
    ...SESSION_DIRS.filter((f) => !FOLDER_ORDER.includes(f)).sort(),
  ];

  const sessions = orderedFolders
    .filter((folder) => findReadme(folder))
    .map((folder) => buildSession(folder, youtubeRss));

  const youtubeVideos = await enrichYouTubeFromSessions(sessions, youtubeRss);
  console.log(`Total YouTube videos after enrichment: ${youtubeVideos.length}`);

  // Re-match sessions with full video list
  for (const session of sessions) {
    session.youtubeChannelVideos = matchYouTubeVideos(
      session.id,
      session.title,
      youtubeVideos,
    );
  }

  const siteData: SiteData = {
    config: {
      title: "CP Sessions Hub",
      author: "Ahmed Hossam",
      handle: "7oSkaa",
      description:
        "Competitive Programming sessions — videos, problems, articles, and curated resources.",
      youtubeChannel: "https://www.youtube.com/@7oSkaa/videos",
      youtubeChannelId: YOUTUBE_CHANNEL_ID,
      links: {
        templates: "https://github.com/7oSkaaa/CP-Templates",
        juniorSheet:
          "https://docs.google.com/spreadsheets/d/1iJZWP2nS_OB3kCTjq8L6TrJJ4o-5lhxDOyTaocSYc-k/edit#gid=84654839",
        juniorSheetAddon: "https://github.com/Waelahmed99/junior-sheet-add-on",
        assiutSheet:
          "https://docs.google.com/spreadsheets/d/1EbbsotAwb0zuuwxyzs8l2qh8twqw-sNcNbAjCK1kXaE/edit?usp=drivesdk",
        arabicCpChannel:
          "https://www.youtube.com/channel/UC8OxKsmAyrGAfBiluhpLkbA",
        github:
          "https://github.com/7oSkaaa/Competitive-Programming-Session-Content",
      },
    },
    sessions,
    youtubeVideos,
    categories: [
      {
        id: "fundamentals",
        label: "Fundamentals",
        description: "STL, functions, recursion basics",
      },
      {
        id: "data-structures",
        label: "Data Structures",
        description: "Segment trees, DSU, advanced containers",
      },
      {
        id: "algorithms",
        label: "Algorithms",
        description: "DP, binary search, and core algorithms",
      },
      {
        id: "techniques",
        label: "Techniques",
        description: "Two pointers, bits, backtracking",
      },
      {
        id: "math",
        label: "Math",
        description: "Number theory and mathematical tools",
      },
      {
        id: "misc",
        label: "Miscellaneous",
        description: "Thinking, revision, and extras",
      },
    ],
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(siteData, null, 2));
  console.log(`Generated ${sessions.length} sessions → ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
