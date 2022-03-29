<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <span class="text-3xl">{{ t("welcome") }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";
export default defineComponent({
  name: "WelcomeExtensionStep1",
  setup() {
    const {
      $i18n: { $t },
    } = useNuxtApp();
    return {
      t: $t,
    };
  },
});
</script>

<style scoped></style>
