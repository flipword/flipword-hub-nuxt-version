<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <span class="text-3xl">{{ i18n("welcome") }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";
export default defineComponent({
  name: "WelcomeExtensionStep1",
  setup() {
    const { $i18n } = useNuxtApp();
    return {
      i18n: $i18n,
    };
  },
});
</script>

<style scoped></style>
