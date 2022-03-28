<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-32 pb-32"
  >
    <span class="text-3xl">{{ i18n("what_is_language") }}</span>
    <CountrySelect :current-lang="currentLang" @changeLang="pickLanguage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useNuxtApp } from "#app";
import CountrySelect from "~/components/CountrySelect.vue";
import { langOptions } from "~/plugins/i18n";

export default defineComponent({
  name: "WelcomeExtensionStep1",
  components: {
    CountrySelect,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const {
      $i18n,
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

    const pickLanguage = (lang: string) => {
      emit("click", lang);
    };

    return {
      props: props,
      i18n: $i18n,
      currentLang,
      pickLanguage,
    };
  },
});
</script>

<style scoped></style>
