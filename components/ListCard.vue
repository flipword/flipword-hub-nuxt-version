<template>
  <div class="w-60 h-28">
    <div
      class="
        w-full
        h-1/2
        bg-primary
        flex flex-row
        justify-center
        items-center
        rounded-t-lg
      "
    >
      <span class="font-sans text-lg leading-normal text-white">{{
        nativeWord
      }}</span>
    </div>
    <div
      class="
        w-full
        h-1/2
        bg-white
        items-center
        flex flex-row
        justify-center
        items-center
        rounded-b-lg
        border-primary border-2
      "
    >
      <span class="text-black">{{ foreignWord }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    nativeWord: { default: "" },
    foreignWord: { default: "" },
  },
  setup() {
    return {};
  },
});
</script>
