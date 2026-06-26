import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Github,
  Menu,
  X,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import ScrollRestoration from "@/components/ScrollRestoration";
import siteData from "@/data/site-data.json";
import type { SiteData } from "@/types";

const data = siteData as SiteData;

const NAV = [
  { to: "/", label: "Sessions" },
  { to: "/youtube", label: "YouTube" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen">
      <ScrollRestoration />
      <div
        className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-40"
        aria-hidden
      />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              className="h-10 w-10 rounded-xl shadow-lg shadow-accent/30 transition-transform group-hover:scale-105"
            />
            <div>
              <p className="font-display text-lg font-bold leading-tight text-white">
                CP Sessions
              </p>
              <p className="text-xs text-slate-400">by {data.config.handle}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === to
                    ? "bg-accent/20 text-accent-light"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={data.config.links.templates}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 btn-ghost !py-2 !text-xs"
            >
              Templates
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-white/5 px-4 py-4 md:hidden">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="relative">
        <Outlet />
      </main>

      <footer className="relative mt-24 border-t border-white/5 bg-surface-raised/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                {data.config.author}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {data.config.description}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Resources
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <FooterLink href={data.config.links.juniorSheet} label="Junior Sheet" />
                <FooterLink href={data.config.links.assiutSheet} label="Assiut Materials" />
                <FooterLink href={data.config.links.arabicCpChannel} label="Arabic CP Channel" />
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Connect
              </h4>
              <div className="mt-3 flex gap-3">
                <a
                  href={data.config.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover rounded-xl p-3 text-red-400"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href={data.config.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover rounded-xl p-3 text-slate-300"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <p className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
            Built from{" "}
            <a
              href={data.config.links.github}
              className="text-accent-light hover:underline"
            >
              Competitive-Programming-Session-Content
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 transition-colors hover:text-accent-light"
      >
        {label}
      </a>
    </li>
  );
}
