<template>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-32 pb-32"
  >
    <span class="text-center text-3xl">{{ t("sign_in") }}</span>
    <div class="flex flex-col gap-8">
      <button
        class="bg-primary flex flex-row items-center gap-2 px-10 py-3 rounded-xl"
        @click="signInWith(authMethod.GOOGLE)"
      >
        <img src="/assets/icons/google.svg" />
        <span class="text-black font-bold">{{ t("google_auth") }}</span>
      </button>
      <button
        class="bg-black flex flex-row items-center gap-2 px-10 py-3 rounded-xl"
        @click="signInWith(authMethod.APPLE)"
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
import { AuthMethod } from "~/plugins/auth.client";

export default defineComponent({
  name: "WelcomeExtensionStep2",
  components: {},
  emits: ["click", "signIn"],
  setup(props, { emit }) {
    const {
      $i18n: { $t, currentLang },
    } = useNuxtApp();

    const pickLanguage = () => {
      emit("click");
    };

    const signInWith = (auth: AuthMethod) => {
      emit("signIn", auth);
    };

    return {
      props: props,
      t: $t,
      currentLang,
      authMethod: AuthMethod,
      pickLanguage,
      signInWith,
    };
  },
});
</script>

<style scoped></style>
