import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tina from "@tinacms/astro/integration";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [react(), tina()],
  server: {
    port: 3000,
  },
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
    },
  },
  adapter: cloudflare({
    sessionKVBindingName: "KV",
  }),
});
