<template>
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
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

const { $router } = useNuxtApp();
</script>

<style scoped></style>
