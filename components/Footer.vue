<template>
  <div
    class="w-full h-8 px-6 flex flex-row justify-end items-center gap-5 bg-primary filter drop-shadow-top"
  >
    <NuxtLink to="/about-us">
      <span class="text-black font-bold cursor-pointer">{{$t('about_us')}}</span>
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
</template>

<script setup lang="ts">
import {useNuxtApp} from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();
</script>

<style scoped></style>
