export type LinkType =
  | "youtube"
  | "drive"
  | "problem"
  | "article"
  | "sheet"
  | "template"
  | "video"
  | "external";

export interface ResourceLink {
  label: string;
  url: string;
  type: LinkType;
}

export interface SessionSection {
  id: string;
  title: string;
  level: number;
  links: ResourceLink[];
  note?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
}

export interface Session {
  id: string;
  title: string;
  folder: string;
  category: SessionCategory;
  tags: string[];
  description: string;
  sections: SessionSection[];
  primaryVideos: ResourceLink[];
  youtubeChannelVideos: YouTubeVideo[];
  stats: SessionStats;
  markdown: string;
}

export interface SessionStats {
  videos: number;
  problems: number;
  articles: number;
  sheets: number;
  total: number;
}

export type SessionCategory =
  | "fundamentals"
  | "data-structures"
  | "algorithms"
  | "techniques"
  | "math"
  | "misc";

export interface SiteConfig {
  title: string;
  author: string;
  handle: string;
  description: string;
  youtubeChannel: string;
  youtubeChannelId: string;
  links: {
    templates: string;
    juniorSheet: string;
    juniorSheetAddon: string;
    assiutSheet: string;
    arabicCpChannel: string;
    github: string;
  };
}

export interface SiteData {
  config: SiteConfig;
  sessions: Session[];
  youtubeVideos: YouTubeVideo[];
  categories: { id: SessionCategory; label: string; description: string }[];
}

export const CATEGORY_META: Record<
  SessionCategory,
  { label: string; description: string; color: string }
> = {
  fundamentals: {
    label: "Fundamentals",
    description: "Core C++ concepts, STL, and building blocks",
    color: "from-violet-500 to-purple-600",
  },
  "data-structures": {
    label: "Data Structures",
    description: "Trees, DSU, and advanced containers",
    color: "from-cyan-500 to-blue-600",
  },
  algorithms: {
    label: "Algorithms",
    description: "DP, binary search, recursion, and more",
    color: "from-emerald-500 to-teal-600",
  },
  techniques: {
    label: "Techniques",
    description: "Two pointers, bits, backtracking, and tricks",
    color: "from-amber-500 to-orange-600",
  },
  math: {
    label: "Math",
    description: "Number theory and mathematical foundations",
    color: "from-rose-500 to-pink-600",
  },
  misc: {
    label: "Miscellaneous",
    description: "Thinking sessions, revision, and extras",
    color: "from-slate-400 to-slate-600",
  },
};
