import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const repoBase = "/Competitive-Programming-Session-Content/";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: isGitHubPages ? repoBase : "/",
});
