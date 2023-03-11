<template>
  <div class="h-auto sm:w-15vw w-36 filter drop-shadow-md aspect-video">
    <div
      class="w-full h-1/2 bg-primary flex flex-row justify-center items-center rounded-t-3xl"
    >
      <span
        class="font-sans 2xl:text-3xl xl:text-2xl text-xl leading-normal text-white"
        >{{ props.nativeWord }}</span
      >
    </div>
    <div
      class="w-full h-1/2 bg-white items-center flex flex-row justify-center items-center rounded-b-3xl border-primary border-2"
    >
      <span class="2xl:text-3xl xl:text-2xl text-xl text-black">{{
        props.foreignWord
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  nativeWord: { default: "" },
  foreignWord: { default: "" },
});
</script>
