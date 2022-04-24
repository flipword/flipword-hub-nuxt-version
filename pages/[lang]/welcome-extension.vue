<template>
  <ClientOnly>
    <NuxtLayout name="light-layout">
      <div class="h-full flex flex-col">
        <div
          class="h-auto w-full flex flex-grow flex-col justify-center items-center gap-10"
        >
          <div
            v-if="step < 4"
            class="h-3/4 2xl:w-3/12 xl:w-4/12 lg:w-5/12 md:w-8/12 w-9/12 p-6 rotate-card-parent"
          >
            <div
              class="h-full w-full bg-white rounded-lg shadow-lg rotate-card-inner"
              :style="step > 0 ? 'transform: rotateY(180deg)' : ''"
            >
              <WelcomeExtensionStep0 v-if="step == 0" />
              <div
                v-else-if="displayContentCard"
                class="h-full w-full bg-white rounded-lg shadow-lg"
                :style="step > 0 ? 'transform: rotateY(-180deg)' : ''"
              >
                <WelcomeExtensionStep1 v-if="step == 1" @save="nextStep" />
                <WelcomeExtensionStep2
                  v-else-if="step == 2"
                  @click="pickForeignLang"
                />
                <WelcomeExtensionStep3
                  v-else-if="step == 3"
                  @sign-in="signIn"
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="2xl:w-6/12 xl:w-8/12 lg:w-9/12 md:w-10/12 w-11/12 bg-white p-6 rounded-lg shadow-lg"
          >
            <WelcomeExtensionStep4 />
          </div>
          <div
            v-if="step < 4"
            :class="`${step == 0 ? 'invisible' : 'visible'}`"
            class="lg:w-8/12 w-10/12 h-4"
          >
            <WelcomeStepper :current-step="step" :nb-step="3" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { useHead, useNuxtApp } from "#app";
import WelcomeExtensionStep0 from "~/components/welcome-extension-step/WelcomeExtensionStep0.vue";
import WelcomeExtensionStep1 from "~/components/welcome-extension-step/WelcomeExtensionStep1.vue";
import WelcomeExtensionStep2 from "~/components/welcome-extension-step/WelcomeExtensionStep2.vue";
import WelcomeExtensionStep3 from "~/components/welcome-extension-step/WelcomeExtensionStep3.vue";
import WelcomeExtensionStep4 from "~/components/welcome-extension-step/WelcomeExtensionStep3.vue";
import WelcomeStepper from "~/components/WelcomeStepper.vue";
import ClientOnly from "#app/components/client-only.mjs";

enum AuthMethod {
  GOOGLE = 1,
  APPLE = 2,
}

export default defineComponent({
  name: "WelcomeExtension",
  components: {
    WelcomeExtensionStep0,
    WelcomeExtensionStep1,
    WelcomeExtensionStep2,
    WelcomeExtensionStep3,
    WelcomeExtensionStep4,
    WelcomeStepper,
    ClientOnly,
  },
  setup() {
    onBeforeMount(() => {
      step.value = getCurrentStep();
      displayContentCard.value = step.value != 0;
    });

    onMounted(() => {
      countDownStep1();
    });

    const {
      $i18n: {
        $t,
        currentLang,
        updateLang,
        getNativeLanguageLabel,
        getForeignLanguageLabel,
      },
    } = useNuxtApp();

    const getTitle = () => `- ${$t("welcome")}`;
    useHead({
      title: computed(() => `Flipword ${$t("welcome") ? getTitle() : ""}`),
    });

    const isClient = process.client;

    const step = ref<number>(0);
    const displayContentCard = ref<boolean>(false);
    let foreignLanguage = null;

    const countDownStep1 = () => {
      if (step.value == 0) {
        setTimeout(nextStep, 2000);
      }
    };

    const nextStep = () => {
      if (step.value == 0) {
        setTimeout(() => (displayContentCard.value = true), 500);
      }
      step.value += 1;
      if (isClient) {
        localStorage.setItem("step", step.value.toString());
      }
    };

    const setStep = (newStep: number) => {
      step.value = newStep;
      localStorage.setItem("step", step.value.toString());
    };

    const getCurrentStep = () => {
      let currentStep = 0;
      if (isClient) {
        currentStep = Number(localStorage.getItem("step"));
      }
      return currentStep;
    };

    const pickForeignLang = (lang: string) => {
      foreignLanguage = lang;
      nextStep();
    };

    const signIn = (authMethod: AuthMethod) => {
      if (isClient) {
        // If you try to log but you don't have foreign language set
        if (!foreignLanguage) {
          // TODO: Add notify or store foreign in localStorage
          setStep(2);
          return;
        }
        // Create custom event that will be catch by web extension to sign in
        const event = new CustomEvent("flipwordAuthRequest", {
          detail: {
            authMethod: authMethod,
            nativeLanguage: currentLang.value,
            foreignLanguage: foreignLanguage,
          },
        });

        document.dispatchEvent(event);
        // Catch event emit by extension when login success
        document.addEventListener("loginSuccessful", () => {
          nextStep();
        });
      }
    };

    return {
      t: $t,
      step,
      nextStep,
      isClient,
      currentLang,
      updateLang,
      pickForeignLang,
      signIn,
      getNativeLanguageLabel,
      getForeignLanguageLabel,
      displayContentCard,
    };
  },
});
</script>

<style scoped>
.rotate-card-parent {
  background-color: transparent;
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out box-shadow;
  perspective: 1000px;
}

.rotate-card-inner {
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
</style>
