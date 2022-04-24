<template>
  <div class="h-screen w-full flex flex-col">
    <div
      class="h-14 flex flex-row w-full justify-between items-center filter drop-shadow-md"
    >
      <div
        class="flex flex-row items-center gap-2 pl-3 cursor-pointer"
        @click="$router.push('/')"
      >
        <img src="~/assets/icons/logo.svg" class="h-10 w-auto" />
        <span class="text-2xl text-black font-bold">FlipWord</span>
      </div>
      <CountrySelect
        class="mb-2"
        :current-lang="currentLang"
        @changeLang="updateLang"
      />
    </div>
    <div class="flex-auto">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import Footer from "~/components/Footer.vue";
import CountrySelect from "~/components/CountrySelect.vue";

const {
  $i18n: { currentLang, updateLang },
  $router,
} = useNuxtApp();
</script>

<style scoped></style>
