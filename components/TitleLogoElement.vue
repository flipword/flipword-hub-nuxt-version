<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-row justify-center">
      <img src="~/assets/icons/logo_dark.svg" class="h-auto xl:w-32 w-24" />
      <div class="flex flex-col justify-center">
        <span
          class="font-sans 2xl:text-9xl xl:text-8xl lg:text-7xl text-4xl text-black font-bold"
          >FlipWord</span
        >
      </div>
    </div>
    <div class="w-full flex justify-center">
      <span
        class="font-sans 2xl:text-4xl xl:text-3xl lg:text-2xl text-xl text-black text-center"
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
