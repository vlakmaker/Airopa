// vite.config.ts
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",     // bind to all interfaces for external access
    port: 5173,          // standard Vite port (use whatever you like)
    strictPort: true,    // fail instead of auto-picking random ports
    open: false,         // don't auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    fs: {
      // Force Vite to allow reading markdown files and project files
      allow: ["."],
    },
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
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer'],
  },
}));
