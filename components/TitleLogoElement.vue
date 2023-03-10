<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-row justify-center">
      <img
        src="~/assets/icons/logo_dark.svg"
        class="h-auto"
        style="width: 8vw"
      />
      <div class="flex flex-col justify-center">
        <span class="font-sans text-black font-bold" style="font-size: 6vw"
          >FlipWord</span
        >
      </div>
    </div>
    <div class="w-full flex justify-center">
      <span class="font-sans text-black text-center" style="font-size: 2vw">{{
        $t("subtitle")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();
</script>
