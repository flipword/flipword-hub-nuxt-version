<template>
  <div ref="buttonRef" class="relative">
    <button
      class="flex flex-row gap-2 bg-base rounded-xl items-center p-2 cursor-pointer"
      @click="toggleSelectLang()"
    >
      <img :src="`/icons/flags/${currentFlagPath}`" class="h-10 w-full" />
      <span class="text-black font-bold text-xl">{{
        currentLanguageLabel
      }}</span>
      <img src="~/assets/icons/filled_arrow_down.svg" class="h-4 w-auto" />
    </button>

    <div
      v-if="isSelectLangOpen"
      class="flex flex-col bg-base text-black text-xl rounded-xl shadow-md dropdown overflow-hidden absolute top-16 -left-5 -right-5 m-auto"
    >
      <div class="flex flex-col gap-2 p-4">
        <div
          v-for="lang in selectableCountryList"
          :key="lang.id"
          class="flex flex-row w-full pl-4 py-2 gap-5 rounded-xl cursor-pointer hover:bg-primary bg-white"
          @click="updateLanguage(lang.id)"
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
import { ref, computed } from "vue";
import { flagPaths, getLabelFromLangId } from "~/plugins/i18n";
import { useNuxtApp } from "#app";
import { useToggle, onClickOutside } from "@vueuse/core";

interface IProps {
  isNativeLangSelect: boolean;
}

const props = defineProps<IProps>();

const {
  $i18n: {
    currentNativeLang,
    currentForeignLang,
    foreignLanguageList,
    updateNativeLang,
    updateForeignLang,
  },
} = useNuxtApp();

const buttonRef = ref(null);

const [isSelectLangOpen, toggleSelectLang] = useToggle();
onClickOutside(buttonRef, () => {
  isSelectLangOpen.value = false;
});

const currentFlagPath = computed(() => {
  if (props.isNativeLangSelect) {
    return getFlagPath(currentNativeLang.value);
  } else {
    return getFlagPath(currentForeignLang.value);
  }
});

const currentLanguageLabel = computed(() => {
  if (props.isNativeLangSelect) {
    return getLabelFromLangId(currentNativeLang.value);
  } else {
    return getLabelFromLangId(currentForeignLang.value);
  }
});

const selectableCountryList = computed(() => {
  if (props.isNativeLangSelect) {
    return foreignLanguageList.value;
  } else {
    return foreignLanguageList.value.filter(
      (lang: any) => lang.id !== currentForeignLang.value
    );
  }
});

const updateLanguage = (lang: string) =>
  props.isNativeLangSelect ? updateNativeLang(lang) : updateForeignLang(lang);

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
