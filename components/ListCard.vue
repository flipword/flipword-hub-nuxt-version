<template>
  <div class="2xl:w-60 w-48 h-28 filter drop-shadow-md">
    <div
      class="w-full h-1/2 bg-primary flex flex-row justify-center items-center rounded-t-3xl"
    >
      <span class="font-sans text-2xl leading-normal text-white">{{
        props.nativeWord
      }}</span>
    </div>
    <div
      class="w-full h-1/2 bg-white items-center flex flex-row justify-center items-center rounded-b-3xl border-primary border-2"
    >
      <span class="text-2xl text-black">{{ props.foreignWord }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  nativeWord: { default: "" },
  foreignWord: { default: "" },
});
</script>
