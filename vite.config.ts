import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 8080,
    host: true,
    strictPort: true,
    allowedHosts: ["timecoder.dev", "www.timecoder.dev", "localhost"],
  },
  server: {
    host: true,
    port: 8080,
  },
});
