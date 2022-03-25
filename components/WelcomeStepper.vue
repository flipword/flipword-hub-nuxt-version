<template>
  <div class="flex flex-row gap-5 h-full w-full">
    <div
      v-for="step in props.nbStep"
      :key="step"
      class="flex-auto h-full rounded-xl shadow-md"
      :class="`${props.currentStep >= step ? 'bg-primary' : 'bg-white'}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "WelcomeStepper",
  props: {
    nbStep: {
      type: Number,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { $router } = useNuxtApp();

    return {
      router: $router,
      props: props,
    };
  },
});
</script>

<style scoped></style>
