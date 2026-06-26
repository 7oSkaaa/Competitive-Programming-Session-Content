import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.env.GITHUB_PAGES = "true";

function run(command) {
  const result = spawnSync(command, {
    shell: true,
    stdio: "inherit",
    cwd: root,
    env: process.env,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("npm run generate");
run("npx tsc");
run("npx vite build");

const dist = path.join(root, "dist");
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("Built for GitHub Pages → dist/");
