import { defineNuxtPlugin } from "#app";
import * as i18nEN from "../i18n/i18n-en.json";
import * as i18nFR from "../i18n/i18n-fr.json";
import * as i18nES from "../i18n/i18n-es.json";
import * as i18nDE from "../i18n/i18n-de.json";

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
  {
    id: "de",
    label: "German",
    json: i18nDE,
  },
];

export const flagPaths: { [key: string]: string } = {
  en: "english.png",
  fr: "french.png",
  es: "spain.png",
  de: "german.png",
};

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
    // @ts-ignore
    return langIndex != -1 ? langOptions[langIndex]["json"][key] : null;
  });
});
