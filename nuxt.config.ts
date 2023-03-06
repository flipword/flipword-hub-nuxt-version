import { defineNuxtConfig } from "nuxt3";
import { resolve } from "path";
import { createCommonJS } from "mlly";

const { __dirname } = createCommonJS(import.meta.url);

export default defineNuxtConfig({
  modules: ["@vueuse/nuxt"],
  bridge: {
    nitro: process.env.NODE_ENV === "production",
  },
  firebase: {
    service: {
      functions: {
        location: "europe-west1",
      },
    },
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
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          property: "og:title",
          content: "Flipword",
        },
        {
          property: "og:image",
          content:
            "https://storage.googleapis.com/flutter-flip-card.appspot.com/site_thumbnail.png",
        },
        {
          property: "og:description",
          content: "Learn foreign language vocabulary easily and quickly!",
        },
        {
          property: "og:url",
          content: "https://flipword.io",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "627",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
      link: [],
      style: [],
      script: [],
    },
  },
  // TODO: Wait new method to custom root in Nuxt3
  hooks: {
    "pages:extend"(pages) {
      pages.unshift({
        name: "home",
        path: "/",
        file: resolve(__dirname, "pages/[langs]/index.vue"),
      });
      pages.unshift({
        name: "about-us",
        path: "/about-us",
        file: resolve(__dirname, "pages/[langs]/about-us.vue"),
      });
      pages.unshift({
        name: "welcome-extension",
        path: "/welcome-extension",
        file: resolve(__dirname, "pages/[langs]/welcome-extension.vue"),
      });
    },
  },
  extensions: [".js", ".mjs", ".ts", ".tsx", ".vue", ".json"],
});
