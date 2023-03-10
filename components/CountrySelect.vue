<template>
  <div ref="buttonRef">
    <button
      class="flex flex-row gap-2 bg-white rounded-xl items-center p-2 cursor-pointer shadow-md"
      @click="toggleSelectLang()"
    >
      <img src="~/assets/icons/earth.svg" class="h-10 w-auto" />
      <span class="text-black font-bold text-xl">{{ langSelected }}</span>
      <img src="~/assets/icons/filled_arrow_down.svg" class="h-4 w-auto" />
    </button>

    <div
      v-if="isSelectLangOpen"
      class="flex flex-col bg-white text-black text-xl rounded-xl shadow-md dropdown overflow-hidden absolute top-16 right-0"
    >
      <span class="px-6 py-1">{{ $t("speak") }}</span>
      <div
        class="flex flex-row w-full bg-base px-16 py-2 gap-3 cursor-pointer items-center justify-around"
        @click="toggleSelectNativeLang()"
      >
        <img
          :src="`/icons/flags/${getFlagPath(currentNativeLang)}`"
          class="h-8 w-auto"
        />
        <span>{{ getLabelFromLangId(currentNativeLang) }}</span>
        <img
          src="~/assets/icons/right_chevron.svg"
          class="h-5 w-auto chevron"
          :class="isSelectNativeLangOpen ? 'transform rotate-90' : ''"
        />
      </div>
      <div v-if="!isSelectNativeLangOpen" class="flex flex-col gap-2 px-6 py-2">
        <span>{{ $t("want_to_speak") }}</span>
        <div
          v-for="lang in foreignLanguageList"
          :key="lang.id"
          class="flex flex-row w-full pl-8 pr-14 py-2 gap-5 rounded-xl cursor-pointer hover:bg-primary"
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
      <div v-else class="flex flex-col gap-2 px-6 py-2 bg-base">
        <div
          v-for="lang in foreignLanguageList"
          :key="lang.id"
          class="flex flex-row w-full pl-8 pr-14 py-2 gap-5 rounded-xl cursor-pointer hover:bg-primary bg-white"
          @click="updateNativeLang(lang.id)"
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
import { ref, computed, defineEmits } from "vue";
import { flagPaths, getLabelFromLangId } from "~/plugins/i18n";
import { useNuxtApp } from "#app";
import { useToggle, onClickOutside } from "@vueuse/core";

const {
  $i18n: {
    $t,
    currentNativeLang,
    currentForeignLang,
    foreignLanguageList,
    updateNativeLang,
    updateForeignLang,
  },
} = useNuxtApp();

const buttonRef = ref(null);

const [isSelectLangOpen] = useToggle();
const [isSelectNativeLangOpen, toggleSelectNativeLang] = useToggle();

const langSelected = computed(
  () => `${currentNativeLang.value} | ${currentForeignLang.value}`
);

onClickOutside(buttonRef, () => {
  isSelectNativeLangOpen.value = false;
  isSelectLangOpen.value = false;
});

const toggleSelectLang = () => {
  isSelectNativeLangOpen.value = false;
  isSelectLangOpen.value = !isSelectLangOpen.value;
};
const getFlagPath = (lang: string) => flagPaths[lang];
</script>

<style scoped>
.dropdown {
  animation: growInY 120ms ease-in-out;
}

.chevron {
  transition: transform 0.1s ease-in-out;
}
</style>
