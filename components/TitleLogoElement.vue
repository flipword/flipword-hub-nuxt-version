<template>
  <div
      class="w-full h-full pb-20 flex flex-col justify-center items-center"
  >
    <div class="w-full flex flex-row justify-center">
      <img src="~/assets/icons/logo.svg" class="h-full w-1/4" />
      <div class="flex flex-col justify-center">
              <span
                  class="font-sans 2xl:text-8xl xl:text-7xl lg:text-6xl xs:text-6xl text-4xl text-black font-bold"
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
