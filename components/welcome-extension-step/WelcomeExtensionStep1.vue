<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-32 pb-32"
  >
    <span class="text-3xl">{{ t("what_is_language") }}</span>
    <div class="w-full flex flex-col items-center gap-10">
      <CountrySelect :current-lang="currentLang" @changeLang="pickLanguage" />
      <button
        class="flex flex-row gap-3 bg-positive px-4 py-1 rounded-xl items-center"
        @click="
          {
          }
        "
      >
        <span>{{ t("next") }}</span>
        <img src="~/assets/icons/arrow_right.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";
import CountrySelect from "~/components/CountrySelect.vue";

export default defineComponent({
  name: "WelcomeExtensionStep1",
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
