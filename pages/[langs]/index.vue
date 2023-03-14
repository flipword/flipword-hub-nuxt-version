<template>
  <div>
    <!--    Header  -->
    <div
      class="fixed top-0 bg-primary w-full z-40 py-1 px-2 flex flex-row justify-between items-center shadow-md transition-all duration-300"
      :class="titleElementDisplayed ? '-translate-y-full' : 'translate-y-0'"
    >
      <div
        class="flex flex-row items-center gap-2 cursor-pointer"
        @click="scrollTop"
      >
        <img src="~/assets/icons/logo.svg" class="h-12 w-auto" />
        <span class="text-3xl text-black font-bold">FlipWord</span>
      </div>
      <CountrySelect v-if="!titleElementDisplayed" />
    </div>
    <div class="w-full overflow-hidden">
      <!--    Screen part 1  -->
      <div class="h-screen w-full overflow-hidden relative z-10">
        <div class="w-full h-1/2 bg-primary absolute top-0 z-behind" />
        <div class="w-full h-full flex flex-row">
          <div
            class="sm:w-5/12 w-full h-full bg-base sm:rounded-tr-4xl sm:mt-14 pb-28 z-10"
          >
            <div
              class="h-full w-full flex flex-col items-center justify-center transition-all duration-500"
              :class="{
                'opacity-0 scale-125': !isMounted,
                'opacity-100 scale-100': isMounted,
              }"
            >
              <TitleLogoElement ref="titleElementRef" />
              <StartButton class="mt-10" @click="openStore" />
              <NuxtLink class="mt-3" to="/" @click="openTrailer">
                <span
                  class="text-black font-bold cursor-pointer underline underline-offset-4 sm:text-demo text-xl"
                  >{{ $t("demo") }}</span
                >
              </NuxtLink>
            </div>
          </div>
          <div class="is-desktop w-7/12 h-full bg-primary rounded-bl-4xl">
            <IsometricCards
              ref="isometricCard"
              :class="{ 'isometric-card-final': isMounted }"
              class="isometric-card-transition"
              :native-lang="currentNativeLang"
              :foreign-lang="currentForeignLang"
            />
          </div>
        </div>
        <div
          class="is-mobile absolute w-full h-16 start-gradiant bottom-0 z-50"
        />
        <CountrySelect
          v-if="titleElementDisplayed"
          class="absolute top-2 right-2 transition-all duration-500 delay-300 z-50"
          :class="{
            'opacity-0 scale-125': !isMounted,
            'opacity-100 scale-100': isMounted,
          }"
        />
      </div>

      <!--    Screen part 2 Desktop -->
      <div
        class="w-full sm:grid sm:grid-cols-12 flex flex-row flex-wrap pb-10 gap-4"
      >
        <div ref="firstTextRef" class="sm:col-span-5 sm:order-1 w-full order-2">
          <div
            class="flex flex-col gap-4 items-start bg-primary 2xl:p-18 xl:p-14 p-10 sm:rounded-r-3xl sm:mt-10 transition-all duration-500"
            :class="firstTextDisplayed ? 'translate-x-0' : '-translate-x-full'"
          >
            <span
              class="font-sans sm:text-4xl text-3xl leading-normal text-black text-center"
              v-html="$t('create_description_title')"
            />
            <span
              class="font-sans text-xl text-black"
              v-html="$t('create_description')"
            />
          </div>
        </div>
        <div
          class="sm:col-span-7 w-full order-1 2xl:px-32 xl:px-28 sm:px-16 transition-all duration-500"
          :class="firstTextDisplayed ? 'translate-y-0' : '-translate-y-full'"
        >
          <AddingPopup
            :native-word="currentWordInAddingPopup?.nativeWord ?? ''"
            :foreign-word="currentWordInAddingPopup?.foreignWord ?? ''"
            :native-language-label="getNativeLanguageLabel()"
            :foreign-language-label="getForeignLanguageLabel()"
            @update-word="updateWordInAddingPopup"
          />
        </div>
        <div
          class="sm:col-span-5 sm:-mt-10vh w-full order-3 flex flex-col"
          style="padding: 0 3vw 0 3vw; gap: 4vh"
        >
          <div
            v-for="(chunk, index) in wordListChunk"
            :key="index"
            class="flex flex-row justify-between"
          >
            <ListCard
              v-if="chunk[0]"
              :native-word="chunk[0].nativeWord"
              :foreign-word="chunk[0].foreignWord"
              class="transition-all duration-500"
              :class="`${secondTextDisplayed ? 'opacity-100' : 'opacity-0'}`"
            ></ListCard>
            <ListCard
              v-if="chunk[1]"
              :native-word="chunk[1].nativeWord"
              :foreign-word="chunk[1].foreignWord"
              class="transition-all duration-500"
              :class="`${secondTextDisplayed ? 'opacity-100' : 'opacity-0'}`"
            ></ListCard>
          </div>
        </div>
        <div ref="secondTextRef" class="sm:col-span-7 w-full order-4">
          <div
            class="flex flex-col gap-4 bg-primary 2xl:p-20 xl:p-14 p-10 sm:rounded-l-3xl transition-all duration-500"
            :class="secondTextDisplayed ? 'translate-x-0' : 'translate-x-full'"
          >
            <ExtensionPopupAnimation
              :native-language-label="getNativeLanguageLabel()"
              :foreign-language-label="getForeignLanguageLabel()"
              :text="$t('extension_promo_title')"
              :native-word="wordList[currentNativeLang][0]"
              :foreign-word="wordList[currentForeignLang][0]"
            />
            <span
              class="font-sans text-xl text-black"
              v-html="$t('extension_promo')"
            />
          </div>
        </div>
      </div>

      <!--    Screen part 3 -->
      <div
        class="pb-10 flex flex-row justify-center items-center relative mb-10"
      >
        <div
          class="trailer-container relative rounded-2xl overflow-hidden"
          @click="openTrailer"
        >
          <img src="~/assets/images/trailer.png" class="h-full w-full" />
          <div
            class="absolute w-full h-full top-0 trailer-shadow cursor-pointer"
          />
          <img class="play-button" src="~/assets/icons/play.svg" />
        </div>
        <teleport to="body">
          <div
            v-if="isTrailerPlaying"
            class="fixed top-0 w-screen h-screen trailer-shadow z-50 flex flex-row justify-center items-center"
            tabindex="0"
            @click="isTrailerPlaying = false"
          >
            <iframe
              class="trailer-video"
              src="https://www.youtube.com/embed/jBNjdik0eCs?autoplay=1&?hd=1"
              allow="autoplay"
              allowfullscreen
              @keydown.esc="isTrailerPlaying = false"
            />
          </div>
        </teleport>
      </div>
      <!--    Footer -->
      <Footer />
      <resize-observer :show-trigger="true" @notify="handleResize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useHead, useNuxtApp } from "#app";
import IsometricCards from "~/components/IsometricCards.vue";
import AddingPopup from "~/components/AddingPopup.vue";
import ListCard from "~/components/ListCard.vue";
import TitleLogoElement from "~/components/TitleLogoElement.vue";
import ExtensionPopupAnimation from "~/components/ExtensionPopupAnimation.vue";
import Footer from "~/components/Footer.vue";
import { wordList, Word } from "assets/data/words";
import StartButton from "~/components/StartButton.vue";
import { onKeyUp, useElementVisibility } from "@vueuse/core";
import CountrySelect from "~/components/CountrySelect.vue";

const {
  $i18n: {
    $t,
    currentNativeLang,
    currentForeignLang,
    getNativeLanguageLabel,
    getForeignLanguageLabel,
  },
} = useNuxtApp();

onMounted(() => {
  setWordListChunk();
  updateWordInAddingPopup();
  isMounted.value = true;
});

const getTitle = () => `- ${$t("home")}`;

useHead({
  title: computed(() => `Flipword ${$t("home") ? getTitle() : ""}`),
});

const isMobile = ref<boolean>(false);
if (process.client) {
  isMobile.value = window.innerWidth < 1024;
}

const isTrailerPlaying = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
};
const wordListChunk = ref<Word[][]>([]);
const isMounted = ref(false);

const titleElementRef = ref(null);
const titleElementDisplayed = ref(true);
const isVisibleTitleElement = useElementVisibility(titleElementRef);

watch(isVisibleTitleElement, () => {
  titleElementDisplayed.value = isVisibleTitleElement.value;
});

const firstTextRef = ref(null);
const firstTextDisplayed = ref(false);
const isVisibleFirstText = useElementVisibility(firstTextRef);

watch(isVisibleFirstText, () => {
  if (isVisibleFirstText) {
    firstTextDisplayed.value = true;
  }
});

const secondTextRef = ref(null);
const secondTextDisplayed = ref(false);
const isVisibleSecondText = useElementVisibility(secondTextRef);

watch(isVisibleSecondText, () => {
  if (isVisibleSecondText) {
    secondTextDisplayed.value = true;
  }
});

const setWordListChunk = () => {
  if (wordList[currentNativeLang.value]) {
    const nbWordToDisplay = 5;
    wordListChunk.value = Array(nbWordToDisplay)
      .fill(null)
      .map((_, index): Word => {
        return {
          nativeWord: wordList[currentNativeLang.value][index],
          foreignWord: wordList[currentForeignLang.value][index],
        };
      })
      .reduce((resultArray: any[], item, index) => {
        const chunkIndex = Math.floor(index / 2);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
  } else {
    wordListChunk.value = [];
  }
};

const openTrailer = () => {
  isTrailerPlaying.value = true;
};

const currentWordInAddingPopup = ref<Word | null>();

const updateWordInAddingPopup = () => {
  try {
    const nativeWordList = wordList[currentNativeLang.value];
    const foreignWordList = wordList[currentForeignLang.value];
    const index = Math.floor(Math.random() * (nativeWordList.length - 1));
    currentWordInAddingPopup.value = {
      nativeWord: nativeWordList[index],
      foreignWord: foreignWordList[index],
    };
  } catch (err) {
    console.log("err", err);
  }
};

const openStore = () =>
  window.open(
    "https://chrome.google.com/webstore/detail/flipword/hinoggfcanlhfbeddbadjjpdaeoigkbe?hl=fr"
  );

onKeyUp("Escape", () => {
  if (isTrailerPlaying.value) {
    isTrailerPlaying.value = !isTrailerPlaying;
  }
});

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.is-mobile {
  display: none;
}

.isometric-card-transition {
  margin-top: -10rem;
  opacity: 0;
  transition: opacity 500ms, margin-top 500ms;
}

.isometric-card-final {
  margin-top: -50%;
  margin-left: -20vw;
  opacity: 1;
}

.trailer-container {
  width: 70%;
  height: auto;
  aspect-ratio: 16/9;
}

.trailer-video {
  width: 85%;
  height: auto;
  aspect-ratio: 16/9;
  z-index: 50;
}

.trailer-shadow {
  background-color: rgba(0, 0, 0, 0.5);
}

.play-button {
  position: absolute;
  z-index: 10;
  left: calc(50% - 10px);
  top: calc(50% - 10px);
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: auto;
  cursor: pointer;
  animation: slidein 2s ease-in-out infinite;
}

@media screen and (max-width: 640px) {
  .is-mobile {
    display: block;
  }

  .is-desktop {
    display: none;
  }

  .start-gradiant {
    background: linear-gradient(to bottom, #eaeaea, #ff9100);
  }

  .trailer-container {
    width: 80%;
    height: auto;
    aspect-ratio: 16/9;
  }
}
</style>
