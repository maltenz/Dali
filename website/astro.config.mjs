import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tina from "@tinacms/astro/integration";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [react(), tina()],
  server: {
    port: 3000,
  },
  adapter: cloudflare({
    sessionKVBindingName: "KV",
  }),
});
