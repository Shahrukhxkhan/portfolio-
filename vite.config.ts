import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function githubDevApiPlugin() {
  return {
    name: "github-dev-api",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/api/github-contributions")) {
          try {
            const parsedUrl = new URL(req.url, "http://localhost:5173");
            const username = parsedUrl.searchParams.get("username") || "Shahrukhxkhan";
            const { fetchGitHubContributions } = await import("./server/github.ts");
            const data = await fetchGitHubContributions(username);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: "./client",
  plugins: [
    react(),
    tailwindcss(),
    githubDevApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  build: {
    outDir: "../dist/public",
    rollupOptions: {
      output: {
        manualChunks: {
          "three": ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          "motion": ["framer-motion"],
          "ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-popover", "@radix-ui/react-tooltip"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
