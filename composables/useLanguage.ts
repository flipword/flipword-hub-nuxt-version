import { useNuxtApp, useState } from "#app";
import { langOptions } from "~/plugins/i18n";
import { ref } from "vue";

export const useLanguage = () => {
  const {
    $router,
    payload: {
      config: {
        app: { lang },
      },
    },
  } = useNuxtApp();

  const langInUrl = langOptions.find(
    (x: any) => x.id == $router.currentRoute.value.params.lang
  );
  const currentLang = ref(langInUrl ? langInUrl["id"] : lang);

  const getNativeLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang.value);
    if (lang) {
      return lang.label;
    }
    return "";
  };

  const getForeignLanguageLabel = () => {
    const lang = langOptions.find((x: any) => x.id == currentLang.value);
    let foreignLang = langOptions.find((x: any) => x.id == "en");
    if (lang && lang.id == "en") {
      foreignLang = langOptions.find((x: any) => x.id == "fr");
    }
    return foreignLang.label;
  };

  return useState("language", () => [
    lang,
    currentLang.value,
    getNativeLanguageLabel(),
    getForeignLanguageLabel(),
  ]);
};
