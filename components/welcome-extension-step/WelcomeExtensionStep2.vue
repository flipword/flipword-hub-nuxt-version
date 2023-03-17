<template>
  <div class="flex flex-col w-full h-full px-6 pb-6">
    <div
      class="flex-auto w-full flex flex-col justify-center items-center gap-32 pb-32"
    >
      <span class="text-3xl text-center">{{
        $t("which_learned_language")
      }}</span>
      <div class="w-full flex flex-col items-center gap-10">
        <CountrySelect :is-native-lang-select="false" />
      </div>
    </div>
    <div class="flex flex-shrink flex-row w-full justify-end">
      <button
        class="flex flex-row gap-3 bg-positive px-4 py-1 rounded-md items-center"
        @click="emit('nexStep')"
      >
        <span>{{ $t("next") }}</span>
        <img src="~/assets/icons/arrow_right.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useNuxtApp } from "#app";
import CountrySelect from "~/components/CountrySelect.vue";

const emit = defineEmits(["nexStep"]);
const {
  $i18n: { $t },
} = useNuxtApp();
</script>

<style scoped></style>
