import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    sentryVitePlugin({
      org: "yourmove-ai",
      project: "yourmove-ui",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
