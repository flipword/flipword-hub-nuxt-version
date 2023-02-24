<template>
  <div class="relative">
    <div
      class="w-full h-14 bg-primary rounded-b-4xl flex flex-row justify-center items-center filter drop-shadow-xl z-10"
    >
      <img
        src="~/assets/images/microsoft-translate.png"
        class="w-auto lg:h-4/5 h-2/5"
      />
      <span class="ml-3 sm:text-4xl text-3xl text-black font-bold"
        >Microsoft</span
      >
      <span class="ml-1 sm:text-4xl text-3xl text-black">Translate</span>
    </div>
    <div class="w-full h-10 flex flex-row justify-center z-20">
      <div
        class="flex flex-row justify-center items-center w-3/4 h-full bg-primary rounded-b-4xl gap-2 z-20 filter drop-shadow-xl"
      >
        <span class="sm:text-xl text-sm text-black">{{
          props.nativeLanguageLabel
        }}</span>
        <div class="pa-5">
          <img src="~/assets/icons/compare_arrows.svg" class="h-4 w-auto" />
        </div>
        <span class="sm:text-xl text-sm text-black">{{
          props.foreignLanguageLabel
        }}</span>
      </div>
    </div>
    <div class="mt-8 flex flex-col items-center w-full px-24 gap-5">
      <div
        class="flex flex-col w-full h-28 bg-white rounded-3xl filter drop-shadow-xl items-center"
      >
        <div class="flex flex-row w-full justify-end pt-3 pr-3">
          <div><img src="~/assets/icons/clear.svg" class="h-4 w-auto" /></div>
        </div>
        <span v-if="nativeWordDisplayed" class="sm:text-4xl text-3xl mt-3">{{
          props.nativeWord
        }}</span>
      </div>
      <div class="h-12 w-12 transform rotate-45 filter drop-shadow-xl">
        <div
          class="flex flex-row justify-center items-center rounded-lg w-full h-full bg-primary"
        >
          <div
            class="flex flex-row items-center justify-center h-full w-full transform -rotate-45"
          >
            <img
              v-if="!loading"
              src="~/assets/icons/g_translate.svg"
              class="h-6 w-auto"
            />
            <div v-else class="loader"></div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-28 bg-white flex flex-col rounded-3xl filter drop-shadow-xl items-center"
      >
        <div class="flex flex-row w-full justify-end pt-3 pr-3">
          <div><img src="~/assets/icons/clear.svg" class="h-4 w-auto" /></div>
        </div>
        <span
          v-if="foreignWordDisplayed"
          ref="foreignWordRef"
          class="sm:text-4xl text-3xl mt-3"
          >{{ props.foreignWord }}</span
        >
      </div>
      <div
        class="relative p-3 bg-primary flex flex-row gap-2 items-center rounded-lg overflow-hidden"
      >
        <span class="text-black font-semibold">{{ $t("save") }}</span>
        <img src="~/assets/icons/save.svg" class="h-6 w-auto" />
        <div ref="splashButtonRef" class="splash"></div>
      </div>
    </div>
    <div class="absolute flex flex-row justify-center inset-x-0 bottom-0">
      <div
        ref="savedNotifyRef"
        class="p-3 bg-positive rounded-lg elementToFadeOut"
      >
        <span class="text-white font-semibold">{{ $t("saved_word") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, onMounted, onUnmounted } from "vue";
import { useNuxtApp } from "#app";
import blobScriptUrl from "~/assets/worker_scripts/addingPopupWorker.js";

const emit = defineEmits(["updateWord"]);
const props = defineProps({
  nativeWord: {
    type: String,
    required: true,
  },
  foreignWord: {
    type: String,
    required: true,
  },
  nativeLanguageLabel: {
    type: String,
    required: true,
  },
  foreignLanguageLabel: {
    type: String,
    required: true,
  },
});
const {
  $i18n: { $t },
} = useNuxtApp();
const loading = ref(false);
const nativeWordDisplayed = ref(false);
const foreignWordDisplayed = ref(false);
const foreignWordRef = ref<HTMLElement>(null);
const splashButtonRef = ref<HTMLElement>(null);
const savedNotifyRef = ref<HTMLElement>(null);

let worker = null;

onMounted(() => {
  if (process.client) {
    setupAnimation();
  }
});

onUnmounted(() => {
  worker.terminate();
});

const setupAnimation = () => {
  worker = new Worker(blobScriptUrl);
  worker.onmessage = function (e) {
    const result = e.data;
    switch (result) {
      // Display native word
      case 1:
        nativeWordDisplayed.value = true;
        break;
      // Loading trad
      case 2:
        loading.value = true;
        break;
      // Display foreign word
      case 3:
        foreignWordDisplayed.value = true;
        loading.value = false;
        break;
      // Save
      case 4:
        splashEffectOnRef(splashButtonRef.value);
        break;
      // Display Notify
      case 5:
        savedNotifyRef.value.classList.replace(
          "elementToFadeOut",
          "elementToFadeIn"
        );
        break;
      // Reload
      case 6:
        savedNotifyRef.value.classList.replace(
          "elementToFadeIn",
          "elementToFadeOut"
        );
        foreignWordDisplayed.value = false;
        nativeWordDisplayed.value = false;
        emit("updateWord");
        break;
    }
  };
};

const splashEffectOnRef = (ref: any) => {
  ref.style.width = "120%";
  setTimeout(function () {
    ref.style.opacity = "0";
  }, 400);

  setTimeout(function () {
    ref.style.transitionDuration = "0s";
  }, 1000);

  setTimeout(function () {
    ref.style.width = "0";
    ref.style.opacity = "1";
  }, 1100);

  setTimeout(function () {
    ref.style.transitionDuration = ".3s";
  }, 1200);
};
</script>

<style scoped>
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: spin 1.5s linear infinite;
}

.splash {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: 0.3s ease-out;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.elementToFadeIn {
  opacity: 1;
  animation: fadeIn 1s linear;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.elementToFadeOut {
  opacity: 0;
  animation: fadeOut 1s linear;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
