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
          <StartButton class="mt-10" />
          <NuxtLink class="mt-3" to="/">
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
            :lang="currentLang"
          />
        </div>
      </div>
      <!--      <div class="lg:w-1/2 w-full flex flex-col items-center">-->
      <!--        <TitleLogoElement class="z-50" />-->
      <!--      </div>-->
      <!--      <div class="is-desktop w-1/2 flex flex-col justify-end relative">-->
      <!--        <CountrySelect-->
      <!--          class="absolute z-50 top-0 right-0"-->
      <!--          :current-lang="currentLang"-->
      <!--          @changeLang="updateLang"-->
      <!--        />-->
      <!--        <div class="h-full w-full mt-20">-->
      <!--          <IsometricCards-->
      <!--            ref="isometricCard"-->
      <!--            :class="{ 'isometric-card-final': isMounted }"-->
      <!--            class="isometric-card-transition"-->
      <!--            :lang="currentLang"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <!--    Screen part 2-->
    <!--    <div class="screen-part">-->
    <!--      <div class="is-desktop h-full w-full flex flex-row bg-primary">-->
    <!--        <div class="h-full flex flex-col w-7/12">-->
    <!--          <div class="h-1/2 w-full bg-base mt-20 pl-1/12">-->
    <!--            <AddingPopup-->
    <!--              :native-word="currentWordInAddingPopup.nativeWord"-->
    <!--              :foreign-word="currentWordInAddingPopup.foreignWord"-->
    <!--              :native-language-label="getNativeLanguageLabel()"-->
    <!--              :foreign-language-label="getForeignLanguageLabel()"-->
    <!--              @update-word="updateWordInAddingPopup"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <div class="w-full h-20 bg-base">-->
    <!--            <div class="w-full h-full bg-primary rounded-tr-5xl"></div>-->
    <!--          </div>-->
    <!--          <div-->
    <!--            class="flex flex-col flex-grow justify-center items-center lg:px-32 px-3"-->
    <!--          >-->
    <!--            <ExtensionPopupAnimation-->
    <!--              :native-language-label="getNativeLanguageLabel()"-->
    <!--              :foreign-language-label="getForeignLanguageLabel()"-->
    <!--              :text="$t('extension_promo')"-->
    <!--              :native-word="$t('extension_popup_native_word')"-->
    <!--              :foreign-word="$t('extension_popup_foreign_word')"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div-->
    <!--          class="h-full w-5/12 bg-base rounded-tl-5xl rounded-bl-5xl flex flex-col justify-center items-center overflow-hidden"-->
    <!--        >-->
    <!--          <div-->
    <!--            class="h-2/5 w-5/6 my-1/12 rounded-t-5xl bg-primary flex flex-col justify-center items-center px-12 filter drop-shadow-lg"-->
    <!--          >-->
    <!--            <span-->
    <!--              class="font-sans text-4xl leading-normal text-black text-center"-->
    <!--              v-html="$t('create_description')"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <div class="h-1/2 px-16 w-full">-->
    <!--            <div class="w-full flex flex-col gap-5">-->
    <!--              <div-->
    <!--                v-for="(chunk, index) in wordListChunk"-->
    <!--                :key="index"-->
    <!--                class="flex flex-row justify-around"-->
    <!--              >-->
    <!--                <ListCard-->
    <!--                  :native-word="chunk[0].nativeWord"-->
    <!--                  :foreign-word="chunk[0].foreignWord"-->
    <!--                ></ListCard>-->
    <!--                <ListCard-->
    <!--                  :native-word="chunk[1].nativeWord"-->
    <!--                  :foreign-word="chunk[1].foreignWord"-->
    <!--                ></ListCard>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="is-mobile h-full w-full bg-primary">-->
    <!--        <div class="w-full bg-base">-->
    <!--          <AddingPopup-->
    <!--            :native-word="currentWordInAddingPopup.nativeWord"-->
    <!--            :foreign-word="currentWordInAddingPopup.foreignWord"-->
    <!--            :native-language-label="getNativeLanguageLabel()"-->
    <!--            :foreign-language-label="getForeignLanguageLabel()"-->
    <!--            @update-word="updateWordInAddingPopup"-->
    <!--          />-->
    <!--        </div>-->
    <!--        <div class="w-full bg-base flex flex-row justify-center pt-10 px-6">-->
    <!--          <div-->
    <!--            class="h-110 w-full rounded-t-5xl bg-primary flex flex-col justify-center items-center px-3 filter drop-shadow-lg"-->
    <!--          >-->
    <!--            <span-->
    <!--              class="font-sans text-3xl leading-normal text-black text-center"-->
    <!--              v-html="$t('create_description')"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="py-10 px-3 w-full bg-base">-->
    <!--          <div class="w-full flex flex-col gap-5">-->
    <!--            <div-->
    <!--              v-for="(chunk, index) in wordListChunk"-->
    <!--              :key="index"-->
    <!--              class="flex flex-row justify-around gap-4"-->
    <!--            >-->
    <!--              <ListCard-->
    <!--                :native-word="chunk[0].nativeWord"-->
    <!--                :foreign-word="chunk[0].foreignWord"-->
    <!--              ></ListCard>-->
    <!--              <ListCard-->
    <!--                :native-word="chunk[1].nativeWord"-->
    <!--                :foreign-word="chunk[1].foreignWord"-->
    <!--              ></ListCard>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="pt-6 w-full bg-primary">-->
    <!--          <div-->
    <!--            class="flex flex-col flex-grow justify-center items-center lg:px-32 px-3"-->
    <!--          >-->
    <!--            <ExtensionPopupAnimation-->
    <!--              :native-language-label="getNativeLanguageLabel()"-->
    <!--              :foreign-language-label="getForeignLanguageLabel()"-->
    <!--              :text="$t('extension_promo')"-->
    <!--              :native-word="$t('extension_popup_native_word')"-->
    <!--              :foreign-word="$t('extension_popup_foreign_word')"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    Screen part 3 -->
    <!--    <div-->
    <!--      class="screen-part py-5 flex flex-row flex-wrap bg-primary 2xl:px-36 lg:px-24 px-10"-->
    <!--    >-->
    <!--      <div-->
    <!--        class="lg:flex-1 w-full flex flex-row lg:justify-start justify-center items-center"-->
    <!--      >-->
    <!--        <span-->
    <!--          class="font-sans sm:text-4xl text-3xl leading-normal text-black text-center"-->
    <!--          v-html="$t('your_turn')"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <div-->
    <!--        class="lg:flex-1 w-full flex flex-row lg:justify-end justify-center lg:pt-0 pt-3 items-center"-->
    <!--      >-->
    <!--        <button-->
    <!--          class="bg-base px-6 py-4 rounded-3xl filter drop-shadow-lg"-->
    <!--          type="button"-->
    <!--          @click="redirectToApp"-->
    <!--        >-->
    <!--          <div class="w-full flex flex-row items-center justify-center gap-4">-->
    <!--            <span class="sm:text-4xl text-3xl font-bold">{{-->
    <!--              $t("launch_app")-->
    <!--            }}</span>-->
    <!--            &lt;!&ndash;            <img src="~/assets/icons/play.png" />&ndash;&gt;-->
    <!--          </div>-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </div>-->
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
import { wordList } from "assets/data/words";
import { Word } from "~/components/Card.vue";
import StartButton from "~/components/StartButton.vue";

const {
  $i18n: {
    $t,
    currentLang,
    updateLang,
    getNativeLanguageLabel,
    getForeignLanguageLabel,
  },
} = useNuxtApp();

onMounted(() => {
  setWordListChunk();
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

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
};
const wordListChunk = ref<Word[][]>([]);
const isMounted = ref(false);

const setWordListChunk = () => {
  if (wordList[currentLang.value]) {
    const nbWordToDisplay = isMobile.value
      ? 8
      : wordList[currentLang.value].length;
    wordListChunk.value = wordList[currentLang.value]
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

const wordListWithCurrentLang = (): Word[] => {
  return wordList[currentLang.value];
};

const redirectToApp = () => {
  window.open("https://app.flipword.io");
};

const firstWordListWithCurrentLang = (): Word | null => {
  const list = wordListWithCurrentLang();
  if (list && list.length) {
    return list[0];
  } else {
    return null;
  }
};

const currentWordInAddingPopup = ref<Word>(firstWordListWithCurrentLang());

const updateWordInAddingPopup = () => {
  const result = wordListWithCurrentLang();
  const index = Math.floor(Math.random() * (result.length - 1));
  currentWordInAddingPopup.value = result[index];
};
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
