<template>
  <div class="h-screen w-full flex flex-col bg-primary">
    <div
      class="h-14 flex flex-row w-full justify-start items-center filter drop-shadow-md"
    >
      <div
        class="flex flex-row items-center gap-2 pl-3 cursor-pointer"
        @click="$router.push('/')"
      >
        <img src="~/assets/icons/logo.svg" class="h-10 w-auto" />
        <span class="text-2xl text-black font-bold">FlipWord</span>
      </div>
    </div>
    <div class="w-full h-full flex flex-auto flex-row justify-center">
      <div class="h-full flex flex-col justify-center items-center">
        <span class="text-8xl font-bold">404</span>
        <span class="text-4xl font-bold">Page not found</span>
        <NuxtLink to="/" class="bg-base px-6 py-2 mt-4 rounded-lg font-bold"
          >Back to home</NuxtLink
        >
      </div>
    </div>
    <div
      class="w-full h-8 px-6 pb-1 flex flex-row justify-end items-center gap-5 bg-primary"
    >
      <NuxtLink to="/about-us">
        <span class="text-black font-bold cursor-pointer">About us</span>
      </NuxtLink>
      <NuxtLink
        class="flex flex-row items-center gap-2 cursor-pointer"
        to="https://github.com/flipword"
        target="_blank"
      >
        <span class="text-black font-bold">Github</span>
        <img src="~/assets/icons/github.svg" class="h-7 w-auto" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNuxtApp, useHead } from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();

const getTitle = () => `- ${$t("about_us")}`;

useHead({
  title: computed(() => `Flipword ${$t("about_us") ? getTitle() : ""}`),
  layout: "custom",
});
</script>
