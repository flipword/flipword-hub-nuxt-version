import { defineNuxtPlugin, navigateTo, addRouteMiddleware } from "#app";

import * as i18nEN from "../i18n/i18n-en.json";
import * as i18nFR from "../i18n/i18n-fr.json";
import * as i18nES from "../i18n/i18n-es.json";
import * as i18nDE from "../i18n/i18n-de.json";
import { ref } from "vue";
import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";

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

export const defaultLang: string = "en";

export const flagPaths: { [key: string]: string } = {
  en: "en.svg",
  fr: "fr.svg",
  es: "es.svg",
  de: "de.svg",
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $router } = nuxtApp;

  let currentLang = ref(defaultLang);

  const t = (key: string) => {
    if (process.client) {
      currentLang.value =
        $router.currentRoute.value?.params?.lang ?? defaultLang;
    }
    const langIndex = langOptions.findIndex(
      (x: any) => x.id == currentLang.value
    );
    return langIndex != -1 ? langOptions[langIndex]["json"][key] : null;
  };

  const removeLangFromRoute = (
    route: RouteLocationNormalized | RouteLocationNormalizedLoaded
  ) => {
    const hasDoubleSlashInUrl =
      route.fullPath?.indexOf(`/${route.params?.lang}/`) != -1;
    const currentRouteWithoutLang = route.path.replace(
      `/${route.params?.lang}${hasDoubleSlashInUrl ? "/" : ""}`,
      `${hasDoubleSlashInUrl ? "/" : ""}`
    );
    return currentRouteWithoutLang;
  };
  const updateLang = (newLang: string) => {
    const langPath = newLang == defaultLang ? "" : newLang;
    const currentRouteWithoutLang = removeLangFromRoute(
      $router.currentRoute.value
    );
    navigateTo(
      `${langPath != "" ? `/${langPath}` : ""}${currentRouteWithoutLang}`
    );
  };

  const getNativeLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang.value);
    if (lang) {
      return lang.label;
    }
    return "";
  };

  // Todo: Use ref to display label in components
  const getForeignLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang.value);
    let foreignLang = langOptions.find((x: any) => x.id == "en");
    if (lang && lang.id == "en") {
      foreignLang = langOptions.find((x: any) => x.id == "fr");
    }
    return foreignLang.label;
  };

  addRouteMiddleware(
    "i18nRedirect",
    (to, from) => {
      const toRouteWithoutLang = removeLangFromRoute(to);
      const fromRouteWithoutLang = removeLangFromRoute(from);
      if (
        currentLang.value != defaultLang &&
        from.params?.lang != to.params?.lang
      ) {
        if (toRouteWithoutLang != fromRouteWithoutLang) {
          const langPath =
            from.params?.lang == defaultLang ? "" : from.params?.lang;
          return navigateTo(
            `${langPath != "" ? `/${langPath}` : ""}${toRouteWithoutLang}`
          );
        }
      }
      const newCurrentLang = to.params?.lang?.toString() ?? defaultLang;
      if (langOptions.find((x: any) => x.id == newCurrentLang)) {
        currentLang.value = newCurrentLang;
      } else {
        return navigateTo(!toRouteWithoutLang ? "/" : toRouteWithoutLang);
      }
    },
    { global: true }
  );

  nuxtApp.provide("i18n", {
    $t: t,
    currentLang: currentLang,
    updateLang: updateLang,
    getNativeLanguageLabel: getNativeLanguageLabel,
    getForeignLanguageLabel: getForeignLanguageLabel,
  });
});
