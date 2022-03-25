<template>
  <div class="flex flex-col">
    <span class="text-3xl"
      >Merci d'avoir téléchargé l'extension FlipWord !</span
    >
    <span class="text-xl mt-8"
      >Flipword peut vous aider, au quotidien, a améliorer votre vocabulaire
      dans les langues de votre choix.</span
    >
    <span class="text-xl mt-4"
      >Voici un exemple de texte en langue étrangère que vous pouvez rencontrer
      lors de votre navigation:</span
    >
    <div class="px-8">
      <ExtensionPopupAnimation
        class="mt-4"
        :native-language-label="props.nativeLanguageLabel"
        :foreign-language-label="props.foreignLanguageLabel"
        text="An sincerity so extremity he additions. Her yet there truth merit. Mrs
      all projecting favourable now <abbr>unpleasing</abbr>. Son law garden chatty temper. Oh
      children provided to mr elegance marriage strongly. Off can admiration
      prosperous now devonshire diminution law."
        :native-word="i18n('extension_popup_native_word')"
        :foreign-word="i18n('extension_popup_foreign_word')"
        :is-welcome-extension="true"
      />
    </div>
    <span class="text-xl mt-4"
      >Sélectionnez le mot qui vous pose problème, ainsi un bouton de traduction
      apparetra et vous pourrez envoyer ce mot dans votre liste de
      vocabulaire.</span
    >
    <div class="flex flex-row justify-end mt-8">
      <button
        class="bg-primary px-6 py-1 rounded-lg font-bold"
        @click="startClicked"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExtensionPopupAnimation from "~/components/ExtensionPopupAnimation.vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "WelcomeExtensionStep4",
  components: {
    ExtensionPopupAnimation,
  },
  props: {
    nativeLanguageLabel: {
      required: true,
    },
    foreignLanguageLabel: {
      required: true,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const { $i18n } = useNuxtApp();

    const startClicked = () => {
      emit("click");
    };
    return {
      props: props,
      i18n: $i18n,
      startClicked,
    };
  },
});
</script>

<style scoped></style>
