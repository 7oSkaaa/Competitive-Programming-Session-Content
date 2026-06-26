import type { LinkType, ResourceLink, SessionCategory, SessionStats } from "../types";
import { CATEGORY_META } from "../types";
import { normalizeMarkdownForRender } from "./markdown";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const HEADING_PATTERN = /^(#{1,3})\s+(.+)$/;

const PROBLEM_HOSTS = [
  "codeforces.com",
  "leetcode.com",
  "cses.fi",
  "atcoder.jp",
  "spoj.com",
  "codechef.com",
  "vjudge.net",
];

const ARTICLE_HOSTS = [
  "geeksforgeeks.org",
  "cp-algorithms.com",
  "brilliant.org",
  "programiz.com",
  "tutorialspoint.com",
  "medium.com",
  "enjoyalgorithms.com",
  "mathwarehouse.com",
  "educative.io",
  "labuladong.gitbook.io",
  "interviewbit.com",
  "algorithms-digest",
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function isIndividualProblemUrl(url: string): boolean {
  if (url.includes("leetcode.com/problems/")) return true;
  if (url.includes("cses.fi/problemset/task/")) return true;
  if (/atcoder\.jp\/contests\/[^/]+\/tasks\//.test(url)) return true;
  if (url.includes("spoj.com/problems/")) return true;
  if (url.includes("codechef.com/problems/")) return true;
  if (url.includes("vjudge.net/problem/")) return true;
  if (/codeforces\.com\/.*\/problem\//.test(url)) return true;
  if (url.includes("codeforces.com/problemset/problem/")) return true;
  if (url.includes("gymproblem/")) return true;
  if (/codeforces\.com\/edu\/.*\/practice\/.*\/problem\//.test(url)) return true;
  return false;
}

function isSheetOrContestUrl(url: string, label: string): boolean {
  if (label.includes("sheet")) return true;
  if (/contest\s*#\s*\d/.test(label)) return true;
  if (url.includes("codeforces.com/contests/")) return true;
  if (/codeforces\.com\/group\/[^/]+\/contest\/\d+\/?$/.test(url)) return true;
  if (/codeforces\.com\/gym\/\d+\/?$/.test(url)) return true;
  if (url.includes("vjudge.net/contest/")) return true;
  if (
    label.includes("contest") &&
    !isIndividualProblemUrl(url) &&
    PROBLEM_HOSTS.some((h) => url.includes(h))
  ) {
    return true;
  }
  return false;
}

export function classifyLink(url: string, label: string): LinkType {
  const lower = url.toLowerCase();
  const labelLower = label.toLowerCase();

  if (
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    labelLower.includes("youtube")
  ) {
    return "youtube";
  }
  if (lower.includes("drive.google.com") || lower.includes("sharepoint.com")) {
    return "drive";
  }
  if (
    (lower.includes("github.com") && lower.includes("cp-templates")) ||
    lower.includes("7oskaaa.github.io/cp-templates")
  ) {
    return "template";
  }
  if (isIndividualProblemUrl(lower)) return "problem";
  if (isSheetOrContestUrl(lower, labelLower)) return "sheet";
  if (ARTICLE_HOSTS.some((h) => lower.includes(h))) return "article";
  if (labelLower.includes("session") || labelLower.includes("video")) {
    return "video";
  }
  return "external";
}

export function extractLinks(line: string): ResourceLink[] {
  const links: ResourceLink[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(LINK_PATTERN.source, "g");

  while ((match = regex.exec(line)) !== null) {
    const label = match[1].replace(/\*\*/g, "").replace(/_/g, " ").trim();
    const url = match[2].trim();
    links.push({ label, url, type: classifyLink(url, label) });
  }

  return links;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function preprocessMarkdownForDisplay(markdown: string): string {
  return normalizeMarkdownForRender(markdown);
}

const EXTERNAL_EDUCATOR =
  /adel|nassim|mostafa|errich|playlist|cpp\s*nuts|kacy\s*codes|pavel|affifi|solver\s*to\s*be|apna\s*college|4kids|elementary|arabic|edu\s*step|khaled\s*rezk|erricho|pavel\s*marvin|solver/i;

const SUPPLEMENTARY_SECTION =
  /extra\s*resources|additional\s*material|external\s*links|if you want/i;

const SUPPLEMENTARY_TOPIC =
  /^(priority[_\s]?queue|multiset|orderd[_\s]?set|ternary\s*search|binary\s*search)$/i;

export function isSessionRecording(link: ResourceLink): boolean {
  if (link.url.startsWith("#")) return false;
  if (
    link.type === "problem" ||
    link.type === "sheet" ||
    link.type === "article" ||
    link.type === "template"
  ) {
    return false;
  }

  const lower = link.label.toLowerCase();
  if (EXTERNAL_EDUCATOR.test(lower)) return false;
  if (SUPPLEMENTARY_TOPIC.test(lower.replace(/_/g, " "))) return false;

  if (link.type === "drive") {
    if (EXTERNAL_EDUCATOR.test(lower)) return false;
    return true;
  }

  const sessionPattern =
    /session|part\s*#?\s*\d+|stl\s*-?\s*i|recursive|iterative|bitmask|application|function\s*session|\d+\s*pointers|part\s*\d+|23'|newcomers|setup|stress|complexity|introduction/i;
  if (sessionPattern.test(lower)) return true;

  if (link.type === "youtube" || link.type === "video") {
    const id = getYouTubeId(link.url);
    if (id && Object.values(SESSION_YOUTUBE_MAP).flat().includes(id)) return true;
  }

  return false;
}

function recordingSortOrder(link: ResourceLink): number {
  const label = link.label.toLowerCase();
  const part = extractPartNumber(link.label);

  if (/^session\s*video/i.test(label)) return 0;
  if (/session/i.test(label) && part === null && !/\bpart\b/.test(label)) return 1;
  if (/stl\s*-?\s*i/i.test(label)) return 2;
  if (/recursive/i.test(label)) return 10;
  if (/iterative/i.test(label)) return 11;
  if (/bitmask/i.test(label)) return 12;
  if (/application/i.test(label) && /stl/i.test(label)) return 3;
  if (part !== null) return 100 + part;
  return 50;
}

export function extractPartNumber(label: string): number | null {
  const match = label.match(/part\s*#?\s*(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function sortSessionRecordings(links: ResourceLink[]): ResourceLink[] {
  const unique = [...new Map(links.map((l) => [l.url, l])).values()];
  return unique.sort((a, b) => recordingSortOrder(a) - recordingSortOrder(b));
}

function isSupplementarySection(title: string): boolean {
  return SUPPLEMENTARY_SECTION.test(title);
}

export function getSessionRecordings(
  sections: { title: string; links: ResourceLink[] }[],
): ResourceLink[] {
  const candidates: ResourceLink[] = [];
  const sessionSections = sections.filter((s) => /^session$/i.test(s.title.trim()));
  const videoSections = sections.filter(
    (s) =>
      !isSupplementarySection(s.title) &&
      /videos?/i.test(s.title) &&
      !sessionSections.includes(s),
  );
  const otherSections = sections.filter(
    (s) =>
      !sessionSections.includes(s) &&
      !videoSections.includes(s) &&
      !isSupplementarySection(s.title),
  );

  for (const section of [...sessionSections, ...videoSections, ...otherSections]) {
    for (const link of section.links) {
      if (isSessionRecording(link)) candidates.push(link);
    }
  }

  return sortSessionRecordings(candidates);
}

export function getPrimaryYouTubeEmbed(
  recordings: ResourceLink[],
  channelVideos: { id: string; title: string }[],
  sessionId: string,
): { id: string; title: string } | null {
  if (recordings.some((r) => r.type === "drive")) return null;

  const mappedIds = SESSION_YOUTUBE_MAP[sessionId] ?? [];

  for (const recording of recordings) {
    const id = getYouTubeId(recording.url);
    if (!id) continue;
    if (
      mappedIds.includes(id) ||
      /session|part|recursive|iterative|bitmask|23'|newcomers|setup|complexity|introduction/i.test(
        recording.label,
      )
    ) {
      return { id, title: recording.label };
    }
  }

  for (const id of mappedIds) {
    const match = channelVideos.find((v) => v.id === id);
    if (match) return { id: match.id, title: match.title };
  }

  return null;
}

export function getSupplementaryVideos(
  allLinks: ResourceLink[],
  sessionRecordings: ResourceLink[],
): ResourceLink[] {
  const recordingUrls = new Set(sessionRecordings.map((r) => r.url));
  return allLinks.filter((link) => {
    if (recordingUrls.has(link.url)) return false;
    if (link.url.startsWith("#")) return false;
    return (
      link.type === "youtube" ||
      link.type === "drive" ||
      link.type === "video"
    );
  });
}

export function buildSessionDescription(
  title: string,
  sections: { title: string; links: ResourceLink[] }[],
  markdown: string,
  folder: string,
): string {
  const intro = extractIntroFromMarkdown(markdown);
  if (intro) return intro;

  const outlineSection = sections.find((s) => /outline/i.test(s.title));
  if (outlineSection && outlineSection.links.length > 0) {
    const topics = outlineSection.links.slice(0, 5).map((l) => l.label);
    if (topics.length) {
      const suffix = outlineSection.links.length > 5 ? ", and more" : "";
      return `Covers ${topics.join(", ")}${suffix}.`;
    }
  }

  const category = FOLDER_CATEGORY[folder];
  if (category) return CATEGORY_META[category].description;

  return `Curated problems, videos, and resources for ${title}.`;
}

function extractIntroFromMarkdown(markdown: string): string | null {
  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^#{1,2}\s/.test(line)) break;
    if (/^<h1/i.test(line)) continue;
    if (line.startsWith("<") || line.startsWith("![") || line.startsWith("|")) continue;
    if (line.startsWith("- ")) continue;

    const cleaned = stripMarkdown(line);
    if (cleaned.length >= 15 && cleaned.length <= 220) return cleaned;
  }
  return null;
}

const SITE_URL = "https://7oSkaaa.github.io/Competitive-Programming-Session-Content";

export function getSiteAssetUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

export function countByType(links: ResourceLink[]): Record<LinkType, number> {
  const counts: Record<LinkType, number> = {
    youtube: 0,
    drive: 0,
    problem: 0,
    article: 0,
    sheet: 0,
    template: 0,
    video: 0,
    external: 0,
  };
  for (const link of links) counts[link.type]++;
  return counts;
}

export function computeSessionStats(links: ResourceLink[]): SessionStats {
  const unique = (items: ResourceLink[]) =>
    new Set(items.map((l) => l.url)).size;

  const problems = links.filter((l) => l.type === "problem");
  const sheets = links.filter((l) => l.type === "sheet");
  const videos = links.filter((l) =>
    ["youtube", "drive", "video"].includes(l.type),
  );
  const articles = links.filter((l) => l.type === "article");

  return {
    problems: unique(problems),
    sheets: unique(sheets),
    videos: unique(videos),
    articles: unique(articles),
    total: unique(links),
  };
}

export function formatPracticeLabel(count: number, kind: "problem" | "sheet"): string {
  const word = kind === "problem" ? "problem" : "sheet";
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function flattenLinks(
  sections: { links: ResourceLink[] }[],
): ResourceLink[] {
  return sections.flatMap((s) => s.links);
}

export const FOLDER_CATEGORY: Record<string, SessionCategory> = {
  "STLS Session": "fundamentals",
  "STLS Applications": "fundamentals",
  "Advanced STLS": "fundamentals",
  Function: "fundamentals",
  Recursion: "fundamentals",
  "Segment Tree": "data-structures",
  DSU: "data-structures",
  DP: "algorithms",
  "Binary Search": "algorithms",
  Backtracking: "techniques",
  "2 Pointers": "techniques",
  Bits: "techniques",
  "Number Theory": "math",
  "Some Math": "math",
  Miscellaneous: "misc",
  "Revision & Tricks": "misc",
  "Tips & Tricks Assiut Sheet": "misc",
  Thinking_Discussion: "misc",
};

export const FOLDER_ORDER = [
  "STLS Session",
  "STLS Applications",
  "Advanced STLS",
  "Function",
  "Recursion",
  "2 Pointers",
  "Binary Search",
  "Bits",
  "Backtracking",
  "DP",
  "DSU",
  "Segment Tree",
  "Number Theory",
  "Some Math",
  "Miscellaneous",
  "Revision & Tricks",
  "Tips & Tricks Assiut Sheet",
  "Thinking_Discussion",
];

export const SESSION_YOUTUBE_MAP: Record<string, string[]> = {
  "segment-tree": ["EM7WxB6ekl8", "IN2mYScTTbg"],
  "dp-dynammic-programming": ["DmtGtp8hBas"],
  "disjoint-set-union": ["TODdUeifThQ"],
  bits: ["wmq4XA2VBhU"],
  miscellaneous: ["CAkMhaNr47U", "vtcEK6k_u_E"],
  "thinking-discussion": ["UA9-CaD3758"],
  "thinking-session-notes": ["UA9-CaD3758"],
  "newcomers-intro-programming": ["FU0IyvmFi_c"],
  "setup-environment-stress-testing": ["8UvUyVjpWdU"],
  "time-complexity-discussion": ["Xio3CYdXmLM"],
  "newcomers-session-4-strings": ["5jzsNkviJjI"],
};

export function parseMarkdownSections(content: string) {
  const lines = content.split(/\r?\n/);
  const sections: {
    id: string;
    title: string;
    level: number;
    links: ResourceLink[];
    note?: string;
  }[] = [];

  let current: (typeof sections)[0] | null = null;
  let title = "";

  const htmlTitle = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (htmlTitle) title = stripMarkdown(htmlTitle[1]);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("![") || line === "<br>" || /^<br\s*\/?>$/i.test(line))
      continue;
    if (line.startsWith("<") && !line.startsWith("<details")) continue;

    const headingMatch = line.match(HEADING_PATTERN);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingContent = headingMatch[2];
      const headingTitle = stripMarkdown(headingContent);
      const headingLinks = extractLinks(headingContent);

      if (level === 1 && !title) {
        title = headingTitle;
        if (headingLinks.length > 0) {
          current = {
            id: slugify(headingTitle || "session"),
            title: headingTitle || "Session",
            level,
            links: headingLinks,
          };
          sections.push(current);
        }
        continue;
      }

      current = {
        id: slugify(headingTitle),
        title: headingTitle,
        level,
        links: [...headingLinks],
      };
      sections.push(current);
      continue;
    }

    const links = extractLinks(line);
    if (links.length === 0) continue;

    if (!current) {
      current = {
        id: "resources",
        title: "Resources",
        level: 2,
        links: [],
      };
      sections.push(current);
    }
    current.links.push(...links);
  }

  return { title, sections };
}

export function matchYouTubeVideos(
  sessionId: string,
  _sessionTitle: string,
  allVideos: { id: string; title: string; url: string; thumbnail: string; publishedAt: string }[],
): typeof allVideos {
  const explicitIds = SESSION_YOUTUBE_MAP[sessionId] ?? [];
  return allVideos.filter((video) => explicitIds.includes(video.id));
}

export function formatDate(iso: string): string {
  if (!iso) return "Session recording";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Session recording";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getLinkIcon(type: LinkType): string {
  const icons: Record<LinkType, string> = {
    youtube: "▶",
    drive: "☁",
    problem: "⚡",
    article: "📖",
    sheet: "📋",
    template: "📄",
    video: "🎬",
    external: "🔗",
  };
  return icons[type];
}

export function getPlatformName(url: string): string {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    if (host.includes("codeforces")) return "Codeforces";
    if (host.includes("leetcode")) return "LeetCode";
    if (host.includes("cses.fi")) return "CSES";
    if (host.includes("atcoder")) return "AtCoder";
    if (host.includes("spoj")) return "SPOJ";
    if (host.includes("vjudge")) return "VJudge";
    if (host.includes("youtube") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("drive.google")) return "Google Drive";
    if (host.includes("github")) return "GitHub";
    return host.split(".")[0];
  } catch {
    return "Link";
  }
}
