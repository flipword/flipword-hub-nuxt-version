<template>
  <NuxtLink
    class="w-56 bg-white h-fit-content flex flex-row items-center pl-3 py-2 gap-5 rounded-lg border border-whiteShadow shadow-lg cursor-pointer"
    :to="storeLink"
    target="_blank"
  >
    <img :src="`/stores/${props.storePath}`" class="w-auto h-10" />
    <div class="flex flex-col">
      <span class="font-bold">{{ props.store }}</span>
      <span>{{ props.platform }}</span>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonStore",
  props: {
    store: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    storePath: {
      type: String,
      required: true,
    },
    storeLink: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
.h-fit-content {
  height: fit-content;
}
</style>
