import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { normalizeMarkdownForRender } from "@/lib/markdown";
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
}

const components: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-white/10 px-4 py-2 text-left font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-white/10 px-4 py-2 text-slate-300">{children}</td>
  ),
  details: ({ children }) => (
    <details className="session-details my-6 rounded-xl border border-white/10 bg-surface-raised/60 p-4">
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary className="session-summary cursor-pointer select-none font-semibold text-white marker:text-accent-light">
      {children}
    </summary>
  ),
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const markdown = normalizeMarkdownForRender(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
