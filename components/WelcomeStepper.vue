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

<script lang="ts" setup>
const props = defineProps({
  nbStep: {
    type: Number,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});
</script>
