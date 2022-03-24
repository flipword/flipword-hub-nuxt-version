<template>
  <div>
    <!--    TODO: use Nuxt 3 Layout boilerplate -->
    <Layout />
    <div class="w-full flex flex-row justify-center">
      <div
        class="mt-32 xl:w-2/5 lg:w-3/5 md:w-4/5 w-10/12 bg-white p-6 rounded-lg"
      >
        <WelcomeExtensionStep1
          v-if="step == 1"
          :foreign-language-label="getForeignLanguageLabel()"
          :native-language-label="getNativeLanguageLabel()"
          @click="nextStep"
        />
        <WelcomeExtensionStep2 v-else-if="step == 2" />
        <WelcomeExtensionStep3 v-else-if="step == 3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Layout from "~/components/Layout.vue";
import { useMeta, useNuxtApp } from "#app";
import WelcomeExtensionStep1 from "~/components/WelcomeExtensionStep1.vue";
import WelcomeExtensionStep2 from "~/components/WelcomeExtensionStep2.vue";
import WelcomeExtensionStep3 from "~/components/WelcomeExtensionStep3.vue";
import { langOptions } from "~/plugins/i18n";

export default defineComponent({
  name: "WelcomeExtension",
  components: {
    WelcomeExtensionStep1,
    WelcomeExtensionStep2,
    WelcomeExtensionStep3,
    Layout,
  },
  setup() {
    const {
      $i18n,
      $router,
      payload: {
        config: {
          app: { lang },
        },
      },
    } = useNuxtApp();

    const getTitle = () => `- ${$i18n("welcome")}`;

    useMeta({
      title: computed(() => `Flipword ${$i18n("welcome") ? getTitle() : ""}`),
    });

    const step = ref<number>(1);

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

    const nextStep = () => {
      step.value += 1;
    };

    return {
      i18n: $i18n,
      step,
      nextStep,
      getNativeLanguageLabel,
      getForeignLanguageLabel,
    };
  },
});
</script>

<style scoped></style>
