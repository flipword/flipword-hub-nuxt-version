<template>
  <button
    class="flex flex-row items-stretch start-button"
    @click="emit('click')"
  >
    <div
      class="flex flex-col justify-center self-auto px-4 start-button-icon"
      :class="props.isFirstButton ? 'bg-primary' : 'bg-positive'"
    >
      <img class="h-auto sm:w-2.5vw w-7" src="~/assets/icons/play.svg" />
    </div>
    <div
      class="text-white sm:py-5 py-3 px-5 start-button-label sm:text-button text-2xl"
      :class="props.isFirstButton ? 'bg-primary' : 'bg-positive'"
    >
      {{ $t("start") }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";

interface IProps {
  isFirstButton: boolean;
}
const emit = defineEmits(["click"]);
const props = defineProps<IProps>();

const {
  $i18n: { $t },
} = useNuxtApp();
</script>

<style scoped>
.start-button {
  gap: 1vw;
  transition: 0.3s ease-in-out gap;
}
.start-button:hover {
  gap: 0;
}

.start-button-icon {
  border-radius: 0.75rem;
  transition: 0.3s ease-in-out border-radius;
}

.start-button:hover .start-button-icon {
  border-radius: 0.75rem 0 0 0.75rem;
}

.start-button-label {
  border-radius: 0.75rem;
  transition: 0.3s ease-in-out border-radius;
}

.start-button:hover .start-button-label {
  border-radius: 0 0.75rem 0.75rem 0;
}
</style>
