<template>
  <div class="flex flex-row px-10 py-5">
    <img :src="`/stores/${props.storePath}`" class="w-auto h-12" />
    <div class="flex flex-col">
      <span class="font-bold">{{ props.store }}</span>
      <span>{{ props.platform }}</span>
    </div>
  </div>
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
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped></style>
