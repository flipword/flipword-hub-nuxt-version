<template>
  <div class="w-full h-20 bg-primary rounded-b-3xl flex flex-row justify-center items-center">
    <img src="~/assets/images/microsoft-translate.png" style="height: 80%; width: auto"/>
    <span class="ml-3 text-4xl text-black font-bold">Microsoft</span>
    <span class="ml-1 text-4xl text-black">Translate</span>
  </div>
  <div class="w-full h-10 flex flex-row justify-center">
    <div class="flex flex-row justify-center items-center w-3/4 h-full bg-primary rounded-b-3xl gap-2">
      <span class="text-black">French</span>
      <div class="pa-5">
        <img src="assets/icons/compare_arrows.png" />
      </div>
      <span class="text-black">English</span>
    </div>
  </div>
  <div class="mt-5 flex flex-col w-full px-12 h-96 gap-5">
    <div class="flex flex-row w-full h-40 bg-white rounded-3xl">
      <div class="flex flex-row w-full justify-end pt-3 pr-3">
        <div><img src="~/assets/icons/clear.png"/></div>
      </div>
    </div>
    <div class="transform rotate-90 h-12 w-12">
      <div class="flex flex-row justify-center items-center rounded-lg w-full h-full bg-primary">
        <div ><img src="~/assets/icons/g_translate.png"/></div>
      </div>
    </div>
    <div class="w-full h-40 bg-white flex flex-row rounded-3xl">
      <div class="flex flex-row w-full justify-end pt-3 pr-3">
        <div><img src="~/assets/icons/clear.png"/></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddingPopup",
  setup() {
    return {
    };
  },
});
</script>

<style scoped>
</style>
