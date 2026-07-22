// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  schema: {
    collections: [
      {
        name: "hero",
        label: "Hero",
        path: "content/hero",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true
          }
        ]
      },
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body"
          }
        ]
      },
      {
        name: "artwork",
        label: "Artwork",
        path: "content/artworks",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
