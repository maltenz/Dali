/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "dali-web",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
      providers: {
        aws: "7.20.0",
        cloudflare: "6.15.0",
      },
    };
  },
  async run() {
    const website = new sst.cloudflare.StaticSite("DaliWeb", {
      path: "website",
      build: {
        command: "bun run build",
        output: "dist",
      },
      environment: {
        VITE_APP_NAME: "dali-web",
      },
    });

    return {
      SiteUrl: website.url,
    };
  },
});
