import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },

  build: {
    // Source maps ship the whole codebase to visitors and were flagged in the
    // 2026-08-14 PageSpeed "Best Practices" audit. Off in production.
    sourcemap: false,

    // Inline anything under 4 KB as a data URI instead of paying for a request.
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    minify: "esbuild",

    rollupOptions: {
      output: {
        // The audit found a single 653 KB entry chunk, so the browser had to
        // parse all of React, GSAP and the icon set before first paint.
        // Splitting the rarely-changing vendor code out means repeat visitors
        // reuse it from cache and only re-download app code.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["gsap"],
          "vendor-icons": ["lucide-react"],
          "vendor-head": ["react-helmet-async"],
        },

        // Stable, fingerprinted filenames so the year-long cache headers in
        // public/.htaccess are safe.
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },

    // The old single bundle tripped this at the default 500 KB. With the
    // vendor split each chunk lands well under, so keep the warning useful.
    chunkSizeWarningLimit: 600,
  },

  esbuild: {
    // Strip console/debugger noise from the production bundle — console errors
    // were one of the "Best Practices" deductions.
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
