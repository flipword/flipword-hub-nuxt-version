<template>
  <div class="flex flex-col items-center">
    <span class="text-3xl">What is your language ?</span>
    <CountrySelect
      class="mt-8"
      :current-lang="currentLang"
      @changeLang="pickLanguage"
    />
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

    const pickLanguage = () => {
      emit("click");
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
