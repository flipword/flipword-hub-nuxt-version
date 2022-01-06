<template>
  <div class="h-3/5 w-3/4 relative">
    <div
      class="w-full top-0 -right-2 -bottom-1 bg-whiteShadow rounded-b-5xl absolute"
    ></div>
    <div
      class="h-full w-full bg-white rounded-b-5xl relative flex justify-center items-center"
    >
      <div class="h-5/6 w-5/6 bg-primary rounded-b-5xl">
        <div
          class="w-full h-full pb-20 flex flex-col justify-center items-center"
        >
          <div class="w-full flex flex-row justify-center">
            <img src="~/assets/icons/logo.png" class="h-full w-1/4" />
            <span class="font-sans text-title text-black font-bold"
              >FlipWord</span
            >
          </div>
          <div class="w-full flex justify-center">
            <span class="font-sans text-subtitle text-black text-center">{{
              i18n("subtitle")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "TitleLogoElement",
  setup() {
    const {
      $i18n,
      $router,
      payload: {
        config: {
          app: { lang },
        },
      },
    } = useNuxtApp();
    return {
      i18n: $i18n,
    };
  },
});
</script>
