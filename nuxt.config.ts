import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  app: {
    lang: "en",
  },
  ssr: false,
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
