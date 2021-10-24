import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  app: {
    lang: "en",
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  extensions: [".js", ".mjs", ".ts", ".tsx", ".vue", ".json"],
});
