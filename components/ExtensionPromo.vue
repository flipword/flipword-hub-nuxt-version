<template>
  <div class="flex flex-col flex-grow justify-center items-center px-32">
    <span
      id="extension_promo"
      ref="extensionPromoRef"
      class="z-10 font-sans text-4xl leading-normal text-black"
      v-html="i18n('extension_promo')"
    />
    <div ref="selectedDivRef" class="absolute selected-div"></div>
    <img
      ref="cursorRef"
      src="~/assets/icons/cursor.png"
      class="z-50 absolute cursor"
    />
    <div
      ref="logoRef"
      class="z-20 absolute p-0.5 bg-primary filter drop-shadow-lg hidden"
    >
      <img class="w-10 h-10" src="~/assets/icons/logo.png" />
    </div>
    <div
      ref="addingPopupRef"
      class="z-20 absolute w-60 h-52 bg-base filter drop-shadow-lg hidden rounded-md"
    >
      <div
        class="w-full h-full flex flex-col items-center justify-center gap-4"
      >
        <div class="w-4/5">
          <span class="ml-2 px-2 font-bold bg-white rounded-t-sm">French:</span>
          <div
            class="-mt-1 pl-3 h-10 bg-white rounded-sm flex flex-col justify-center"
          >
            <span class="text-black text-lg">Facilement</span>
          </div>
        </div>
        <div class="w-4/5">
          <span class="ml-2 px-2 font-bold bg-white rounded-t-sm"
            >Anglais:</span
          >
          <div
            class="-mt-1 pl-3 h-10 bg-white rounded-sm flex flex-col justify-center"
          >
            <span class="text-black text-lg">Easely</span>
          </div>
        </div>

        <div
          ref="submitBtnRef"
          class="w-1/3 h-10 bg-primary filter drop-shadow-lg flex flex-row justify-center items-center rounded-lg"
        >
          <span class="text-black text-lg font-bold">Submit</span>
        </div>
      </div>
    </div>
    <resize-observer :show-trigger="true" @notify="handleResize" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useNuxtApp } from "nuxt3/dist/app";

export default defineComponent({
  name: "ExtensionPromo",
  setup() {
    const { $i18n } = useNuxtApp();
    const extensionPromoRef = ref<HTMLElement>(null);
    const selectedDivRef = ref<HTMLElement>(null);
    const cursorRef = ref<HTMLElement>(null);
    let abbrNode = ref<HTMLElement>(null);
    let logoRef = ref<HTMLElement>(null);
    let addingPopupRef = ref<HTMLElement>(null);
    let submitBtnRef = ref<HTMLElement>(null);
    let worker = null;

    onMounted(() => {
      if (process.client) {
        worker = new Worker("./assets/worker_scripts/extensionPromoWorker.js");
        setupAnimation();
      }
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
        cursorRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
        logoRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
        }px`;
        logoRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
        addingPopupRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
        }px`;
        addingPopupRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
        selectedDivRef.value.style.transition = "none";
        selectedDivRef.value.style.width = "0";
        addingPopupRef.value.style.display = "none";
        cursorRef.value.style.display = "none";
        logoRef.value.style.display = "none";
      }
    };

    const handleResize = () => {
      if (process.client) {
        selectedDivRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
        selectedDivRef.value.style.top = `${abbrNode.value.offsetTop}px`;
        cursorRef.value.style.left = `${abbrNode.value.offsetLeft}px`;
        cursorRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
        logoRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
        }px`;
        logoRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
        addingPopupRef.value.style.left = `${
          abbrNode.value.offsetLeft + abbrNode.value.offsetWidth
        }px`;
        addingPopupRef.value.style.top = `${abbrNode.value.offsetTop + 36}px`;
      }
    };

    const setupAnimation = () => {
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
            console.log("start sélection");
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
            cursorRef.value.style.left = `${
              abbrNode.value.offsetLeft + abbrNode.value.offsetWidth + 105
            }px`;
            cursorRef.value.style.top = `${abbrNode.value.offsetTop + 220}px`;
            break;
        }
      };
    };
    return {
      extensionPromoRef,
      addingPopupRef,
      selectedDivRef,
      cursorRef,
      logoRef,
      submitBtnRef,
      i18n: $i18n,
      handleResize,
    };
  },
});
</script>

<style scoped>
.selected-div {
  z-index: 0;
  height: 42px;
  background-color: #3498db;
}

.cursor {
  display: none;
  transition: left 2s, top 2s;
}
</style>
