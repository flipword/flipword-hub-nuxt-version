import { defineNuxtConfig } from "nuxt3";
import { resolve } from "path";
import { createCommonJS } from "mlly";
const { __dirname } = createCommonJS(import.meta.url);

export default defineNuxtConfig({
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
  // TODO: Wait new method to custom root in Nuxt3
  hooks: {
    "pages:extend"(pages) {
      pages.unshift({
        name: "home",
        path: "/",
        file: resolve(__dirname, "pages/[lang]/index.vue"),
      });
      pages.unshift({
        name: "about-us",
        path: "/about-us",
        file: resolve(__dirname, "pages/[lang]/about-us.vue"),
      });
      pages.unshift({
        name: "welcome-extension",
        path: "/welcome-extension",
        file: resolve(__dirname, "pages/[lang]/welcome-extension.vue"),
      });
    },
  },
  extensions: [".js", ".mjs", ".ts", ".tsx", ".vue", ".json"],
});
