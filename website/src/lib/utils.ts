import type { LinkType, ResourceLink, SessionCategory } from "../types";

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
  if (lower.includes("github.com") && lower.includes("cp-templates")) {
    return "template";
  }
  if (
    labelLower.includes("sheet") ||
    labelLower.includes("contest") ||
    lower.includes("/contest/")
  ) {
    if (PROBLEM_HOSTS.some((h) => lower.includes(h))) return "sheet";
  }
  if (PROBLEM_HOSTS.some((h) => lower.includes(h))) return "problem";
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
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
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
  dp: ["DmtGtp8hBas", "V98fvNaiLog", "HpQXM3_kXx8"],
  dsu: ["TODdUeifThQ"],
  bits: ["wmq4XA2VBhU"],
  miscellaneous: ["CAkMhaNr47U", "vtcEK6k_u_E"],
  "thinking-discussion": ["UA9-CaD3758"],
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
  const notes: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("<") || line.startsWith("![")) continue;

    const headingMatch = line.match(HEADING_PATTERN);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingTitle = stripMarkdown(headingMatch[2]);
      if (level === 1 && !title) {
        title = headingTitle;
        continue;
      }
      current = {
        id: slugify(headingTitle),
        title: headingTitle,
        level,
        links: [],
      };
      sections.push(current);
      continue;
    }

    if (line.startsWith("- ") && !line.includes("](")) {
      notes.push(stripMarkdown(line.slice(2)));
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

  return { title, sections, notes };
}

export function matchYouTubeVideos(
  sessionId: string,
  sessionTitle: string,
  allVideos: { id: string; title: string; url: string; thumbnail: string; publishedAt: string }[],
): typeof allVideos {
  const explicitIds = SESSION_YOUTUBE_MAP[sessionId] ?? [];
  const titleWords = sessionTitle.toLowerCase().split(/\s+/);

  return allVideos.filter((video) => {
    if (explicitIds.includes(video.id)) return true;
    const videoTitle = video.title.toLowerCase();
    const significantWords = titleWords.filter((w) => w.length > 3);
    const matches = significantWords.filter((w) => videoTitle.includes(w));
    return matches.length >= 2;
  });
}

export function getPrimaryVideos(links: ResourceLink[]): ResourceLink[] {
  return links.filter(
    (l) =>
      l.type === "youtube" ||
      l.type === "drive" ||
      (l.type === "video" &&
        (l.label.toLowerCase().includes("session") ||
          l.label.toLowerCase().includes("part"))),
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
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
