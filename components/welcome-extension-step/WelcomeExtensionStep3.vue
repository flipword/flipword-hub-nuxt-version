<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-32 pb-32"
  >
    <span class="text-center text-3xl">{{ t("sign_in") }}</span>
    <div class="flex flex-col gap-8">
      <button
        class="bg-primary flex flex-row items-center gap-2 px-10 py-3 rounded-xl"
      >
        <img src="/assets/icons/google.svg" />
        <span class="text-black font-bold">{{ t("google_auth") }}</span>
      </button>
      <button
        class="bg-black flex flex-row items-center gap-2 px-10 py-3 rounded-xl"
      >
        <div>
          <img src="/assets/icons/apple.svg" />
        </div>
        <span class="text-white font-bold">{{ t("apple_auth") }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "WelcomeExtensionStep2",
  components: {},
  emits: ["click"],
  setup(props, { emit }) {
    const {
      $i18n: { $t, currentLang },
    } = useNuxtApp();

    const pickLanguage = () => {
      emit("click");
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
