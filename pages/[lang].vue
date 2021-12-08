<template>
  <div>
    <div class="screen-part1 bg-primary flex flex-row overflow-hidden">
      <div class="w-1/2 flex flex-col justify-center items-center">
        <div class="h-3/5 w-3/4 relative">
          <div
            class="
              w-full
              top-0
              -right-2
              -bottom-1
              bg-whiteShadow
              rounded-b-5xl
              absolute
            "
          ></div>
          <div
            class="
              h-full
              w-full
              bg-white
              rounded-b-5xl
              relative
              flex
              justify-center
              items-center
            "
          >
            <div class="h-5/6 w-5/6 bg-primary rounded-b-5xl">
              <div
                class="
                  w-full
                  h-full
                  pb-20
                  flex flex-col
                  justify-center
                  items-center
                "
              >
                <div class="w-full flex flex-row justify-center">
                  <img src="~/assets/icons/logo.png" class="h-full w-1/4" />
                  <span class="font-sans text-title text-black font-bold"
                    >FlipWord</span
                  >
                </div>
                <div class="w-full flex justify-center">
                  <span class="font-sans text-subtitle text-black">{{
                    i18n("subtitle")
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-2/5 w-full flex flex-row justify-center gap-4">
          <div class="w-1/3 h-1/2 flex flex-col justify-center">
            <a
              class="flex flex-row justify-center"
              href="https://play.google.com/store/apps/details?id=com.flutter_flip_card&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
              ><img
                alt="Get it on Google Play"
                src="~/assets/images/download_android.png"
                class="w-56 h-auto"
            /></a>
          </div>
          <div class="w-1/3 h-1/2 flex flex-col justify-center">
            <a
              class="flex flex-row justify-center"
              href="https://play.google.com/store/apps/details?id=com.flutter_flip_card&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
              ><img
                alt="Get it on App Store"
                src="~/assets/images/download_ios.png"
                class="w-60 h-auto"
            /></a>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="flex flex-col justify-end">
          <div class="flex flex-row justify-end mr-6">
            <CountrySelect
              :current-lang="currentLang"
              @changeLang="updateLang"
            />
          </div>
          <IsometricCards :lang="currentLang" />
        </div>
      </div>
    </div>
    <div class="screen-part2 flex flex-row bg-primary">
      <div class="h-full flex flex-col w-7/12">
        <div class="h-1/2 w-full bg-base mt-20 pl-1/12">
          <AddingPopup />
        </div>
        <div class="w-full h-20 bg-base">
          <div class="w-full h-full bg-primary rounded-tr-5xl"></div>
        </div>
        <div class="flex flex-col flex-grow justify-center items-center px-32">
          <span
            class="font-sans text-4xl leading-normal text-black"
            v-html="i18n('extension_promo')"
          />
        </div>
      </div>
      <div
        class="
          h-full
          w-5/12
          bg-base
          rounded-tl-5xl rounded-bl-5xl
          flex flex-col
          justify-center
          items-center
          overflow-hidden
        "
      >
        <div
          class="
            h-2/5
            w-5/6
            my-1/12
            rounded-t-5xl
            bg-primary
            flex flex-col
            justify-center
            items-center
            px-12
          "
        >
          <span
            class="font-sans text-4xl leading-normal text-black"
            v-html="i18n('create_description')"
          />
        </div>
        <div class="h-1/2 px-16 w-full">
          <div class="w-full flex flex-col gap-5">
            <div
              v-for="(chunk, index) in wordListChunked"
              :key="index"
              class="flex flex-row justify-around"
            >
              <ListCard
                :native-word="chunk[0].nativeWord"
                :foreign-word="chunk[0].foreignWord"
              ></ListCard>
              <ListCard
                :native-word="chunk[1].nativeWord"
                :foreign-word="chunk[1].foreignWord"
              ></ListCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="screen-part3 flex flex-row bg-primary pl-24">
      <div class="flex flex-row justify-center items-center flex-1">
        <span
          class="font-sans text-4xl leading-normal text-black"
          v-html="i18n('your_turn')"
        />
      </div>
      <div class="flex flex-row justify-center items-center flex-1">
        <button class="bg-base px-3 py-2 rounded-lg" type="button">
          {{ i18n("launch_app") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useNuxtApp } from "#app";
import { langOptions } from "~/plugins/i18n";
import IsometricCards from "~/components/IsometricCards.vue";
import CountrySelect from "~/components/CountrySelect.vue";
import AddingPopup from "~/components/AddingPopup.vue";
import ListCard from "~/components/ListCard.vue";
import { wordList, Word } from "assets/data/words";

export default defineComponent({
  name: "Index",
  components: { IsometricCards, CountrySelect, AddingPopup, ListCard },
  setup() {
    const {
      $i18n,
      $router,
      payload: {
        config: {
          app: { lang },
        },
      },
    } = useNuxtApp();
    onBeforeMount(() => {
      const langInUrl = $router.currentRoute.value.path.replace("/", "");
      if (
        !(
          langOptions.findIndex((x: any) => x.id == langInUrl) != -1 ||
          langInUrl == ""
        )
      ) {
        $router.push("/");
      }
    });
    const langInUrl = langOptions.find(
      (x: any) => x.id == $router.currentRoute.value.path.replace("/", "")
    );
    const currentLang = ref(langInUrl ? langInUrl["id"] : lang);

    const updateLang = (updatedLang: string) => {
      currentLang.value = updatedLang;
      if (currentLang.value == lang) {
        $router.push("/");
      } else {
        $router.push(`/${currentLang.value}`);
      }
    };

    const wordListChunk = (): Word[][] => {
      return wordList[lang].reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 2);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    };

    return {
      updateLang,
      langOptions,
      currentLang,
      i18n: $i18n,
      wordListChunked: wordListChunk(),
    };
  },
});
</script>

<style scoped>
.screen-part1 {
  height: 120vh;
  width: 100%;
}

.screen-part2 {
  height: 160vh;
  width: 100%;
}

.screen-part3 {
  height: 20vh;
  width: 100%;
}
</style>
