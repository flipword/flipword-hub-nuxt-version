<template>
  <div ref="containerRef">
    <div class="relative">
      <div
        ref="selectedDivRef"
        class="sm:h-14 h-10 absolute selected-div"
      ></div>
      <img
        ref="cursorRef"
        src="~/assets/icons/cursor.svg"
        class="z-40 absolute cursor"
      />
      <div
        ref="logoRef"
        class="z-20 absolute p-0.5 bg-primary filter specific-shadow hidden"
      >
        <img class="w-10 h-10" src="~/assets/icons/logo.svg" />
      </div>
      <div
        ref="addingPopupRef"
        class="z-20 absolute w-60 h-52 bg-base filter specific-shadow hidden rounded-md"
      >
        <div
          class="w-full h-full flex flex-col items-center justify-center gap-4"
        >
          <div class="w-4/5">
            <span class="ml-2 px-2 font-bold bg-white rounded-t-sm"
              >{{ props.nativeLanguageLabel }}:</span
            >
            <div
              class="-mt-1 pl-3 h-10 bg-white rounded-sm flex flex-col justify-center"
            >
              <span class="text-black text-lg">{{ props.nativeWord }}</span>
            </div>
          </div>
          <div class="w-4/5">
            <span class="ml-2 px-2 font-bold bg-white rounded-t-sm"
              >{{ props.foreignLanguageLabel }}:</span
            >
            <div
              class="-mt-1 pl-3 h-10 bg-white rounded-sm flex flex-col justify-center"
            >
              <span class="text-black text-lg">{{ props.foreignWord }}</span>
            </div>
          </div>

          <div
            ref="submitBtnRef"
            class="px-3 py-1 bg-primary filter drop-shadow-lg flex flex-row justify-center items-center rounded-lg"
          >
            <span class="text-black text-lg font-bold">{{ $t("save") }}</span>
          </div>
        </div>
      </div>
      <span
        id="extension_promo"
        ref="extensionPromoRef"
        class="relative font-sans leading-normal sm:text-4xl text-3xl text-black text-center"
        v-html="props.text"
      />
    </div>
    <resize-observer :show-trigger="true" @notify="handleResize" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import blobScriptUrl from "~/assets/worker_scripts/extensionPromoWorker.js";
import { useNuxtApp } from "#app";

const props = defineProps({
  nativeLanguageLabel: {
    type: String,
    required: true,
  },
  foreignLanguageLabel: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  nativeWord: {
    type: String,
    required: true,
  },
  foreignWord: {
    type: String,
    required: true,
  },
});

const {
  $i18n: { $t },
} = useNuxtApp();

const containerRef = ref<HTMLElement>(null);
const extensionPromoRef = ref<HTMLElement>(null);
const selectedDivRef = ref<HTMLElement>(null);
const cursorRef = ref<HTMLElement>(null);
let abbrNode = ref<HTMLElement>(null);
let logoRef = ref<HTMLElement>(null);
let addingPopupRef = ref<HTMLElement>(null);
let submitBtnRef = ref<HTMLElement>(null);
let worker = null;

let handleResize = () => {};

onMounted(() => {
  if (process.client) {
    setupAnimation();
    // TODO: refacto duplicate code
    handleResize = () => {
      selectedDivRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
      selectedDivRef.value.style.top = `${abbrNode.value.offsetTop}px`;
      cursorRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
      cursorRef.value.style.top = `${
        abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 36)
      }px`;
      logoRef.value.style.left = `${
        abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
      }px`;
      logoRef.value.style.top = `${
        abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 36)
      }px`;
      addingPopupRef.value.style.left = `${
        abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
      }px`;
      addingPopupRef.value.style.top = `${
        abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 36)
      }px`;
    };
  }
});

onUnmounted(() => {
  worker.terminate();
});

const initAnimationPosition = () => {
  extensionPromoRef.value.childNodes.forEach((x) => {
    if (x.nodeName == "ABBR") {
      abbrNode.value = x;
    }
  });
  if (abbrNode) {
    selectedDivRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
    selectedDivRef.value.style.top = `${abbrNode.value.offsetTop}px`;
    cursorRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
    cursorRef.value.style.top = `${
      abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 45)
    }px`;
    logoRef.value.style.left = `${
      abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
    }px`;
    logoRef.value.style.top = `${
      abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 45)
    }px`;
    addingPopupRef.value.style.top = `${
      abbrNode.value.offsetTop + (props.isWelcomeExtension ? 15 : 45)
    }px`;
    selectedDivRef.value.style.transition = "none";
    selectedDivRef.value.style.width = "0";
    addingPopupRef.value.style.display = "none";
    cursorRef.value.style.display = "none";
    logoRef.value.style.display = "none";
    if (
      containerRef.value.offsetWidth -
        (abbrNode.value.offsetLeft +
          abbrNode.value.offsetWidth +
          addingPopupRef.value.offsetWidth) >
      100
    ) {
      addingPopupRef.value.style.left = `${
        abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
      }px`;
    } else {
      addingPopupRef.value.style.left = `${
        abbrNode.value.offsetLeft -
        (addingPopupRef.value.offsetWidth + abbrNode.value.offsetWidth)
      }px`;
    }
  }
};

const setupAnimation = () => {
  worker = new Worker(blobScriptUrl);
  worker.onmessage = function (e) {
    const result = e.data;
    switch (result) {
      // Init position
      case 1:
        initAnimationPosition();
        break;
      // Display cursor
      case 2:
        cursorRef.value.style.display = "block";
        break;
      // Start selection
      case 3:
        selectedDivRef.value.style.transition = "width 2s";
        selectedDivRef.value.style.width = `${abbrNode.value.offsetWidth}px`;
        cursorRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
        }px`;
        break;
      // End selection
      case 4:
        logoRef.value.style.display = "block";
        break;
      // Logo appear
      case 5:
        cursorRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth + 15
        }px`;
        cursorRef.value.style.top = `${abbrNode.value.offsetTop + 55}px`;
        break;
      // Adding popup appear
      case 6:
        addingPopupRef.value.style.display = "block";
        cursorRef.value.style.top = `${
          abbrNode.value.offsetTop + (props.isWelcomeExtension ? 185 : 220)
        }px`;
        if (
          containerRef.value.offsetWidth -
            (abbrNode.value.offsetLeft +
              abbrNode.value.offsetWidth +
              addingPopupRef.value.offsetWidth) >
          100
        ) {
          cursorRef.value.style.left = `${
            abbrNode.value.offsetLeft + abbrNode.value.offsetWidth + 105
          }px`;
        } else {
          cursorRef.value.style.left = `${abbrNode.value.offsetLeft + 20}px`;
        }
        break;
    }
  };
};
</script>

<style scoped>
.selected-div {
  background-color: #3498db;
}

.cursor {
  display: none;
  transition: left 2s, top 2s;
}

.specific-shadow {
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
}
</style>
