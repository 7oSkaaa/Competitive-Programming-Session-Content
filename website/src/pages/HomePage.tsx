import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import SessionCard from "@/components/SessionCard";
import siteData from "@/data/site-data.json";
import type { SessionCategory, SiteData } from "@/types";

const data = siteData as SiteData;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<SessionCategory | "all">("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<SessionCategory | "all", number> = {
      all: data.sessions.length,
      fundamentals: 0,
      "data-structures": 0,
      algorithms: 0,
      techniques: 0,
      math: 0,
      misc: 0,
    };
    for (const s of data.sessions) counts[s.category]++;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.sessions.filter((session) => {
      if (category !== "all" && session.category !== category) return false;
      if (!q) return true;
      const haystack = [
        session.title,
        session.folder,
        session.description,
        ...session.sections.flatMap((s) => [
          s.title,
          ...s.links.map((l) => l.label),
        ]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [search, category]);

  return (
    <>
      <Hero />

      <section id="sessions" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="section-heading">All Sessions</h2>
            <p className="mt-2 text-slate-400">
              {filtered.length} of {data.sessions.length} sessions
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            selected={category}
            onChange={setCategory}
            counts={categoryCounts}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl py-16 text-center">
            <p className="text-slate-400">No sessions match your search.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-stagger">
            {filtered.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
