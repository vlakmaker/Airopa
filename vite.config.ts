// vite.config.ts
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",   // bind ONLY to localhost (was '::')
    port: 5173,          // standard Vite port (use whatever you like)
    strictPort: true,    // fail instead of auto-picking random ports
    open: false,         // don't auto-open browser
  },
  preview: {
    host: "127.0.0.1",   // same safety for `npm run preview`
    port: 4173,
    strictPort: true,
    open: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
