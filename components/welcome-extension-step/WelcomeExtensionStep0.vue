<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <span class="text-3xl">{{ $t("welcome") }}</span>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();
</script>

<style scoped></style>
