import { defineNuxtPlugin, addRouteMiddleware, navigateTo } from "#app";
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

  const getLangInUrl = () =>
    langOptions.find(
      (x: any) => x.id == $router.currentRoute.value.params.lang
    );

  let currentLang = lang;

  const t = (key: string) => {
    if (process.server) {
      if (ssrContext) {
        currentLang =
          ssrContext["url"] == "/" ? lang : ssrContext["url"].replace("/", "");
      } else {
        currentLang = lang;
      }
    } else {
      currentLang = $router.currentRoute.value?.params?.lang ?? lang;
    }
    const langIndex = langOptions.findIndex((x: any) => x.id == currentLang);
    return langIndex != -1 ? langOptions[langIndex]["json"][key] : null;
  };

  const updateLang = (newLang: string) => {
    const langPath = newLang == lang ? "/" : newLang;
    const currentRoute = $router.currentRoute.value?.path.replace(
      `/${$router.currentRoute.value?.params?.lang ?? lang}`,
      ""
    );
    navigateTo(`/${langPath}${currentRoute}`);
  };

  const getNativeLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang);
    if (lang) {
      return lang.label;
    }
    return "";
  };

  const getForeignLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang);
    let foreignLang = langOptions.find((x: any) => x.id == "en");
    if (lang && lang.id == "en") {
      foreignLang = langOptions.find((x: any) => x.id == "fr");
    }
    return foreignLang.label;
  };

  // TODO: gérer le cas du click sur about us depuis une page fr par exemple
  addRouteMiddleware(
    "i18nRedirect",
    (to, from) => {
      currentLang = to.params.lang;
      // console.log("ping 1, current: ", currentLang);
      // console.log("to: ", to.params.lang);
      // if (currentLang != to.params.lang) {
      //   console.log("ping 2");
      //   const langPath = currentLang == lang ? "/" : currentLang;
      //   return navigateTo(`/${langPath}${to.fullPath}`);
      // }
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
