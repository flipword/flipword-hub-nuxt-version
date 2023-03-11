<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-row justify-center">
      <img src="~/assets/icons/logo_dark.svg" class="h-auto sm:w-8vw w-20" />
      <div class="flex flex-col justify-center">
        <span class="font-sans text-black font-bold sm:text-title text-6xl"
          >FlipWord</span
        >
      </div>
    </div>
    <div class="w-full flex justify-center">
      <span
        class="font-sans text-black text-center sm:text-subtitle text-2xl"
        >{{ $t("subtitle") }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();
</script>
