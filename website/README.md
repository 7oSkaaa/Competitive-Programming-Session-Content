# CP Sessions Hub

A modern website showcasing all Competitive Programming sessions from this repository, integrated with [7oSkaa's YouTube channel](https://www.youtube.com/@7oSkaa/videos).

## Quick Start

```bash
cd website
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Generate content from READMEs + start dev server |
| `npm run build` | Generate content + production build |
| `npm run generate` | Parse session READMEs and fetch YouTube RSS |

## How It Works

- **`scripts/generate-content.ts`** reads every session folder's README and extracts structured links (videos, problems, articles, sheets).
- YouTube videos are fetched from the channel RSS feed and matched to sessions automatically (with explicit mappings for known sessions).
- The React app consumes `src/data/site-data.json` — no runtime API calls needed.

## Deploy to GitHub Pages

The site deploys automatically on push to `main` via [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml).

**Live URL:** https://7oSkaaa.github.io/Competitive-Programming-Session-Content/

### One-time GitHub setup

1. Open **Settings → Pages** in the repo on GitHub
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Push to `main` (or run the workflow manually from the Actions tab)

### Local GitHub Pages build

```bash
npm run build:pages
```

This sets the correct base path (`/Competitive-Programming-Session-Content/`) and adds a `404.html` SPA fallback.

## Deploy elsewhere

```bash
npm run build
```

Deploy `website/dist/` to Vercel or Netlify with base path `/`.

## Project Structure

```
website/
├── scripts/generate-content.ts   # Content pipeline
├── src/
│   ├── components/               # Reusable UI
│   ├── pages/                    # Route pages
│   ├── lib/utils.ts              # Shared helpers
│   ├── types/                    # TypeScript types
│   └── data/site-data.json       # Generated content
└── public/
```
