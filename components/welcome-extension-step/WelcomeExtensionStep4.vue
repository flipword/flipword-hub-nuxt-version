<template>
  <div class="flex flex-col justify-center">
    <span class="text-4xl text-center">{{ t("congratulation") }} </span>
    <span class="text-2xl mt-8">{{ t("this_is_an_example") }}</span>
    <div class="px-8">
      <ExtensionPopupAnimation
        class="mt-4"
        :native-language-label="getNativeLanguageLabel()"
        :foreign-language-label="getForeignLanguageLabel()"
        text="An sincerity so extremity he additions. Her yet there truth merit. Mrs
      all projecting favourable now <abbr>unpleasing</abbr>. Son law garden chatty temper. Oh
      children provided to mr elegance marriage strongly. Off can admiration
      prosperous now devonshire diminution law."
        :native-word="t('extension_popup_native_word')"
        :foreign-word="t('extension_popup_foreign_word')"
        :is-welcome-extension="true"
      />
    </div>
    <span class="text-2xl mt-4">{{ t("send_word_explication") }}</span>
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
  emits: ["click"],
  setup(props, { emit }) {
    const {
      $i18n: { $t, getNativeLanguageLabel, getForeignLanguageLabel },
    } = useNuxtApp();

    const startClicked = () => {
      emit("click");
    };
    return {
      props: props,
      t: $t,
      startClicked,
      getNativeLanguageLabel,
      getForeignLanguageLabel,
    };
  },
});
</script>

<style scoped></style>
