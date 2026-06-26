import {
  Binary,
  Boxes,
  Brain,
  Calculator,
  Clock,
  Code2,
  Cpu,
  FlaskConical,
  FunctionSquare,
  GitBranch,
  Layers,
  Lightbulb,
  MoveHorizontal,
  Puzzle,
  RefreshCw,
  Search,
  Sigma,
  Terminal,
  TreePine,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { SessionCategory } from "@/types";

const CATEGORY_ICONS: Record<SessionCategory, LucideIcon> = {
  fundamentals: Layers,
  "data-structures": GitBranch,
  algorithms: Binary,
  techniques: Boxes,
  math: Calculator,
  misc: Lightbulb,
};

const SESSION_ICONS: Record<string, LucideIcon> = {
  "newcomers-intro-programming": Code2,
  "setup-environment-stress-testing": Terminal,
  "time-complexity-discussion": Clock,
  "newcomers-session-4-strings": Type,
  "stl-session": Layers,
  "stl-application": Puzzle,
  "advanced-stls": Cpu,
  "function-session": FunctionSquare,
  recursion: RefreshCw,
  "2-pointers": MoveHorizontal,
  "binary-search": Search,
  bits: Binary,
  backtracking: Puzzle,
  "dp-dynammic-programming": Brain,
  "disjoint-set-union": GitBranch,
  "segment-tree": TreePine,
  "number-theory": Sigma,
  "some-math": Calculator,
  miscellaneous: Boxes,
  "revision-tips": Lightbulb,
  "tips-tricks-assiut-contest": FlaskConical,
  "thinking-session-notes": Brain,
};

export function getSessionIcon(sessionId: string, category: SessionCategory): LucideIcon {
  return SESSION_ICONS[sessionId] ?? CATEGORY_ICONS[category];
}

export { CATEGORY_ICONS };
