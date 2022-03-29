<template>
  <div v-if="isClient">
    <NuxtLayout name="base-layout">
      <div class="h-full flex flex-col">
        <div
          class="h-auto w-full flex flex-grow flex-col justify-center items-center gap-10"
        >
          <div
            class="h-3/4 2xl:w-3/12 xl:w-4/12 lg:w-5/12 md:w-8/12 w-9/12 bg-white p-6 rounded-lg shadow-lg"
          >
            <WelcomeExtensionStep0 v-if="step == 0" />
            <WelcomeExtensionStep1
              v-else-if="step == 1"
              @click="changeLanguage"
            />
            <WelcomeExtensionStep2 v-else-if="step == 2" @click="nextStep" />
            <WelcomeExtensionStep3 v-else-if="step == 3" />
          </div>
          <div
            :class="`${step == 0 ? 'invisible' : 'visible'}`"
            class="lg:w-8/12 w-10/12 h-4"
          >
            <WelcomeStepper :current-step="step" :nb-step="3" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { navigateTo, useMeta, useNuxtApp } from "#app";
import WelcomeExtensionStep0 from "~/components/welcome-extension-step/WelcomeExtensionStep0.vue";
import WelcomeExtensionStep1 from "~/components/welcome-extension-step/WelcomeExtensionStep1.vue";
import WelcomeExtensionStep2 from "~/components/welcome-extension-step/WelcomeExtensionStep2.vue";
import WelcomeExtensionStep3 from "~/components/welcome-extension-step/WelcomeExtensionStep3.vue";
import WelcomeStepper from "~/components/WelcomeStepper.vue";

export default defineComponent({
  name: "WelcomeExtension",
  components: {
    WelcomeExtensionStep0,
    WelcomeExtensionStep1,
    WelcomeExtensionStep2,
    WelcomeExtensionStep3,
    WelcomeStepper,
  },
  setup() {
    useMeta({
      title: computed(() => `Flipword ${$i18n("welcome") ? getTitle() : ""}`),
    });

    onBeforeMount(() => {
      step.value = getCurrentStep();
    });

    onMounted(() => {
      countDownStep1();
    });

    const { $i18n } = useNuxtApp();

    const getTitle = () => `- ${$i18n("welcome")}`;

    const step = ref<number>(0);

    const countDownStep1 = () => {
      if (step.value == 0) {
        setTimeout(nextStep, 2000);
      }
    };

    const nextStep = () => {
      step.value += 1;
      if (process.client) {
        localStorage.setItem("step", step.value);
      }
    };

    const changeLanguage = (newLang: string) => {
      // TODO: "Rework i18n on change lang"
      if (currentLang.value == lang) {
        navigateTo("/welcome-extension", { replace: true });
      } else {
        navigateTo(`/${newLang}/welcome-extension`, { replace: true });
      }
      nextStep();
    };

    const getCurrentStep: number = () => {
      let currentStep = 0;
      if (process.client) {
        currentStep = localStorage.getItem("step");
      }
      return Number(currentStep);
    };

    const isClient = process.client;

    return {
      i18n: $i18n,
      step,
      nextStep,
      changeLanguage,
      currentLang,
      nativeLanguageLabel,
      foreignLanguageLabel,
      isClient,
    };
  },
});
</script>

<style scoped></style>
