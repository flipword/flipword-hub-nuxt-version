<template>
  <div class="h-screen w-full flex flex-col">
    <div
      class="h-14 flex flex-row w-full justify-start items-center filter drop-shadow-md"
    >
      <div
        class="flex flex-row items-center gap-2 pl-3 cursor-pointer"
        @click="router.push('/')"
      >
        <img src="~/assets/icons/logo.png" class="h-10 w-auto" />
        <span class="text-2xl text-black font-bold">FlipWord</span>
      </div>
    </div>
    <div class="flex-auto">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";
import Footer from "~/components/Footer.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    Footer,
  },
  setup() {
    const { $router } = useNuxtApp();

    return {
      router: $router,
    };
  },
});
</script>

<style scoped></style>
