<template>
  <div
    class="h-14 flex flex-row w-full pl-3 gap-2 justify-start items-center bg-primary filter drop-shadow-md cursor-pointer"
    @click="router.push('/')"
  >
    <img src="~/assets/icons/logo.png" class="h-10 w-auto" />
    <span class="text-2xl text-black font-bold">FlipWord</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "Layout",
  setup() {
    const { $router } = useNuxtApp();

    return {
      router: $router,
    };
  },
});
</script>

<style scoped></style>
