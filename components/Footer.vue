<template>
  <div
    class="w-full h-8 px-6 flex flex-row justify-end items-center gap-5 bg-primary filter drop-shadow-top"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
