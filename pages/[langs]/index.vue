<template>
  <div>
    <!--    Screen part 1  -->
    <div class="screen-part overflow-hidden relative">
      <div class="w-full h-1/2 bg-primary absolute top-0 z-behind" />
      <div class="w-full h-full flex flex-row">
        <div
          class="w-5/12 h-full bg-base rounded-tr-4xl mt-14 flex flex-col items-center justify-center pb-28 z-10"
        >
          <TitleLogoElement />
          <StartButton class="mt-10" @click="openStore" />
          <NuxtLink class="mt-3" to="/" @click="openTrailer">
            <span
              class="text-black text-xl font-bold cursor-pointer underline underline-offset-4"
              >{{ $t("demo") }}</span
            >
          </NuxtLink>
        </div>
        <div class="w-7/12 h-full bg-primary rounded-bl-4xl">
          <IsometricCards
            ref="isometricCard"
            :class="{ 'isometric-card-final': isMounted }"
            class="isometric-card-transition"
            :native-lang="currentNativeLang"
            :foreign-lang="currentForeignLang"
          />
        </div>
      </div>
      <CountrySelect class="absolute top-2 right-2" />
    </div>

    <!--    Screen part 2-->
    <div class="screen-part flex flex-row overflow-hidden">
      <div class="w-5/12 h-full flex flex-col">
        <div class="w-full bg-primary px-20 py-20 rounded-r-3xl mt-14">
          <span
            class="font-sans text-4xl leading-normal text-black text-center"
            v-html="$t('create_description')"
          />
        </div>
        <div class="w-full flex flex-col gap-8 mt-20 px-14">
          <div
            v-for="(chunk, index) in wordListChunk"
            :key="index"
            class="flex flex-row justify-between"
          >
            <ListCard
              v-if="chunk[0]"
              :native-word="chunk[0].nativeWord"
              :foreign-word="chunk[0].foreignWord"
            ></ListCard>
            <ListCard
              v-if="chunk[1]"
              :native-word="chunk[1].nativeWord"
              :foreign-word="chunk[1].foreignWord"
            ></ListCard>
          </div>
        </div>
      </div>
      <div class="w-7/12 h-full">
        <div class="w-full px-32">
          <AddingPopup
            :native-word="currentWordInAddingPopup?.nativeWord ?? ''"
            :foreign-word="currentWordInAddingPopup?.foreignWord ?? ''"
            :native-language-label="getNativeLanguageLabel()"
            :foreign-language-label="getForeignLanguageLabel()"
            @update-word="updateWordInAddingPopup"
          />
        </div>
        <div class="w-full bg-primary px-20 py-20 rounded-l-3xl mt-20">
          <ExtensionPopupAnimation
            :native-language-label="getNativeLanguageLabel()"
            :foreign-language-label="getForeignLanguageLabel()"
            :text="$t('extension_promo')"
            :native-word="wordList[currentNativeLang][0]"
            :foreign-word="wordList[currentForeignLang][0]"
          />
        </div>
      </div>
    </div>
    <!--    Screen part 3 -->
    <div class="pb-10 flex flex-row justify-center items-center relative mb-10">
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useHead, useNuxtApp } from "#app";
import IsometricCards from "~/components/IsometricCards.vue";
import AddingPopup from "~/components/AddingPopup.vue";
import ListCard from "~/components/ListCard.vue";
import TitleLogoElement from "~/components/TitleLogoElement.vue";
import ExtensionPopupAnimation from "~/components/ExtensionPopupAnimation.vue";
import Footer from "~/components/Footer.vue";
import { wordList, Word } from "assets/data/words";
import StartButton from "~/components/StartButton.vue";
import { onKeyUp } from "@vueuse/core";
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
  console.log("current lang", currentNativeLang.value);
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

const setWordListChunk = () => {
  if (wordList[currentNativeLang.value]) {
    const nbWordToDisplay = 5;
    wordListChunk.value = wordList[currentNativeLang.value]
      .slice(0, nbWordToDisplay)
      .reduce((resultArray, item, index) => {
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
  try{
    const nativeWordList = wordList[currentNativeLang.value];
    const foreignWordList = wordList[currentForeignLang.value];
    const index = Math.floor(Math.random() * (nativeWordList.length - 1));
    currentWordInAddingPopup.value = {
      nativeWord: nativeWordList[index],
      foreignWord: foreignWordList[index],
    };
  } catch (e: any){
    console.log("err", e)
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
</script>

<style scoped>
.screen-part {
  height: 100vh;
  width: 100%;
}

.is-mobile {
  display: none;
}

.is-desktop {
  display: flex;
}

.isometric-card-transition {
  margin-top: -10rem;
  opacity: 0;
  transition: opacity 500ms, margin-top 500ms;
}

.isometric-card-final {
  margin-top: -30rem;
  margin-left: -20rem;
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: auto;
  cursor: pointer;
  animation: slidein 2s ease-in-out infinite;
}

@media screen and (max-width: 1024px) {
  .is-mobile {
    display: block;
  }

  .is-desktop {
    display: none;
  }

  .screen-part2 {
    height: unset;
    width: unset;
  }
}
</style>
