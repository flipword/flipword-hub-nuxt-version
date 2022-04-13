<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-32 pb-32"
  >
    <span class="text-center text-3xl">{{ t("which_learned_language") }}</span>
    <CountrySelect :current-lang="currentLang" @changeLang="pickLanguage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";
import CountrySelect from "~/components/CountrySelect.vue";

export default defineComponent({
  name: "WelcomeExtensionStep2",
  components: {
    CountrySelect,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const {
      $i18n: { $t, currentLang },
    } = useNuxtApp();

    const pickLanguage = (lang: string) => {
      emit("click", lang);
    };

    return {
      props: props,
      t: $t,
      currentLang,
      pickLanguage,
    };
  },
});
</script>

<style scoped></style>
