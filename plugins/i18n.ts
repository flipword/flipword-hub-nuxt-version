import { defineNuxtPlugin, navigateTo, addRouteMiddleware } from "#app";

import * as i18nEN from "../i18n/i18n-en.json";
import * as i18nFR from "../i18n/i18n-fr.json";
import * as i18nES from "../i18n/i18n-es.json";
import * as i18nDE from "../i18n/i18n-de.json";
import { computed, ref } from "vue";
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

export const defaultNativeLang: string = "en";
export const defaultForeignLang: string = "fr";

const defaultLangUrl = `/${defaultNativeLang}-${defaultForeignLang}`;

export const flagPaths: { [key: string]: string } = {
  en: "en.svg",
  fr: "fr.svg",
  es: "es.svg",
  de: "de.svg",
};

export const getLabelFromLangId = (langId: string) => {
  const lang = langOptions.find((x) => x.id === langId);
  if (!lang) {
    return "";
  }
  return lang.label;
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $router } = nuxtApp;

  let currentNativeLang = ref(defaultNativeLang);
  let currentForeignLang = ref(defaultForeignLang);

  const t = (key: string) => {
    const langIndex = langOptions.findIndex(
      (x: any) => x.id == currentNativeLang.value
    );
    return langIndex != -1 ? langOptions[langIndex]["json"][key] : null;
  };

  const removeLangFromRoute = (
    route: RouteLocationNormalized | RouteLocationNormalizedLoaded
  ) => {
    const hasDoubleSlashInUrl =
      route.fullPath?.indexOf(`/${route.params?.langs}/`) != -1;
    const currentRouteWithoutLang = route.path.replace(
      `/${route.params?.langs}${hasDoubleSlashInUrl ? "/" : ""}`,
      `${hasDoubleSlashInUrl ? "/" : ""}`
    );
    return currentRouteWithoutLang;
  };
  const updateNativeLang = (newLang: string) => {
    const currentRouteWithoutLang = removeLangFromRoute(
      $router.currentRoute.value
    );
    navigateTo(
      `/${newLang}-${currentForeignLang.value}${currentRouteWithoutLang}`
    );
  };

  const updateForeignLang = (newLang: string) => {
    const currentRouteWithoutLang = removeLangFromRoute(
      $router.currentRoute.value
    );
    navigateTo(
      `/${currentNativeLang.value}-${newLang}${currentRouteWithoutLang}`
    );
  };

  const getNativeLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentNativeLang.value);
    if (lang) {
      return lang.label;
    }
    return "";
  };

  const getForeignLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentForeignLang.value);
    if (lang) {
      return lang.label;
    }
    return "";
  };

  const foreignLanguageList = computed(() => {
    return langOptions.filter((lang) => lang.id !== currentNativeLang.value);
  });

  addRouteMiddleware(
    "i18nRedirect",
    (to, from) => {
      const toRouteWithoutLang = removeLangFromRoute(to);
      const fromNativeLang = from.params?.langs?.toString().substring(0, 2);
      const fromForeignLang = from.params?.langs?.toString().substring(3, 5);
      // handle redirect to specific route without lang params (ex: /about-us)
      if (!to.params?.langs?.toString() && fromNativeLang && fromForeignLang) {
        return navigateTo(
          `/${fromNativeLang}-${fromForeignLang}${toRouteWithoutLang}`
        );
      }
      const toNativeLang = to.params?.langs?.toString().substring(0, 2);
      const toForeignLang = to.params?.langs?.toString().substring(3, 5);
      // handle case of lang params aren't correct
      if (
        to.params?.langs &&
        (to.params?.langs?.toString().length !== 5 ||
          !langOptions.find((x: any) => x.id == toNativeLang) ||
          !langOptions.find((x: any) => x.id == toForeignLang))
      ) {
        return navigateTo(
          !toRouteWithoutLang
            ? defaultLangUrl
            : `${defaultLangUrl}${toRouteWithoutLang}`
        );
      }
      currentNativeLang.value = toNativeLang ?? defaultNativeLang;
      currentForeignLang.value = toForeignLang ?? defaultForeignLang;
    },
    { global: true }
  );

  nuxtApp.provide("i18n", {
    $t: t,
    currentNativeLang,
    currentForeignLang,
    foreignLanguageList,
    updateForeignLang,
    updateNativeLang,
    getNativeLanguageLabel: getNativeLanguageLabel,
    getForeignLanguageLabel: getForeignLanguageLabel,
  });
});
