<template>
  <div class="flex flex-col items-end gap-3">
    <div
      class="flex flex-row gap-2 bg-white rounded-xl items-center p-2 cursor-pointer shadow-md"
      @click="toggle()"
    >
      <img src="~/assets/icons/earth.svg" class="h-10 w-auto" />
      <span class="text-black font-bold text-xl">{{ langSelected }}</span>
      <img src="~/assets/icons/filled_arrow_down.svg" class="h-4 w-auto" />
    </div>

    <div
      v-if="value"
      class="flex flex-col gap-1 bg-white text-black text-xl rounded-xl shadow-md py-2 dropdown"
    >
      <span class="px-6">I speak:</span>
      <div
        class="flex flex-row w-full bg-base px-6 py-2 gap-3 cursor-pointer items-center justify-around"
      >
        <img
          :src="`/icons/flags/${getFlagPath(currentNativeLang)}`"
          class="h-8 w-auto"
        />
        <span>{{ getLabelFromLangId(currentNativeLang) }}</span>
        <img src="~/assets/icons/right_chevron.svg" class="h-5 w-auto" />
      </div>
      <div class="flex flex-col gap-2 px-6">
        <span>I want to learn:</span>
        <div
          v-for="lang in foreignLanguageList"
          :key="lang.id"
          class="flex flex-row w-full px-6 py-2 gap-5 rounded-xl cursor-pointer"
          :class="lang.id === currentForeignLang ? 'bg-primary' : 'bg-base'"
          @click="updateForeignLang(lang.id)"
        >
          <img
            :src="`/icons/flags/${getFlagPath(lang.id)}`"
            class="h-8 w-auto"
          />
          <span>{{ getLabelFromLangId(lang.id) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
import { flagPaths, getLabelFromLangId } from "~/plugins/i18n";
import { useNuxtApp } from "#app";
import { useToggle } from "@vueuse/core";

const emit = defineEmits(["changeLang"]);

const {
  $i18n: {
    $t,
    currentNativeLang,
    currentForeignLang,
    foreignLanguageList,
    updateForeignLang,
  },
} = useNuxtApp();

const [value, toggle] = useToggle();

const langSelected = computed(
  () => `${currentNativeLang.value} | ${currentForeignLang.value}`
);

const getFlagPath = (lang: string) => flagPaths[lang];

// const updateLang = () => {
//   emit("changeLang", selectedLang.value);
// };
</script>

<style scoped>
.dropdown {
  animation: growInY 120ms ease-in-out;
}
</style>
