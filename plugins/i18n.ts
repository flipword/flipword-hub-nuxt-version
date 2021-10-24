import { defineNuxtPlugin } from "#app";
import i18nEN from "../i18n/i18n-en.json";
import i18nFR from "../i18n/i18n-fr.json";
import i18nES from "../i18n/i18n-es.json";

export const langOptions = [
  {
    id: "en",
    label: "English",
    json: i18nEN,
  },
  {
    id: "es",
    label: "Spanish",
    json: i18nES,
  },
  {
    id: "fr",
    label: "French",
    json: i18nFR,
  },
];

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    $router,
    ssrContext,
    payload: {
      config: {
        app: { lang },
      },
    },
  } = nuxtApp;
  nuxtApp.provide("i18n", (key: string) => {
    let currentLang = "";
    if (process.server) {
      if (ssrContext) {
        currentLang =
          ssrContext["url"] == "/" ? lang : ssrContext["url"].replace("/", "");
      } else {
        currentLang = lang;
      }
    } else {
      const route = $router.currentRoute.value.path.replace("/", "");
      currentLang = route ? route : lang;
    }
    const langIndex = langOptions.findIndex((x: any) => x.id == currentLang);
    return langIndex != -1 ? langOptions[langIndex]["json"][key] : null;
  });
});

declare module "#app" {
  interface NuxtApp {
    $i18n(msg: string): string;
  }
}
