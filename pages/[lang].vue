<template>
  <div>
    <div class="screen-part1 bg-primary flex flex-row">
      <div class="w-1/2 flex justify-center">
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
                  <img
                    src="assets/icons/logo.png"
                    style="height: 120px; width: 120px"
                  />
                  <span class="text-9xl text-black">FlipWord</span>
                </div>
                <div class="w-full flex justify-center mt-2">
                  <span class="text-4xl text-black">{{
                    i18n("subtitle")
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="flex justify-end">
          <select
            v-if="currentLang"
            v-model="currentLang"
            class="mr-5 mt-2"
            name="lang"
            @change="updateLang"
          >
            <option
              v-for="(lang, index) in langOptions"
              :key="index"
              :value="lang.id"
              :selected="currentLang == lang.id"
            >
              {{ lang.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="screen-part2 bg-base"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useNuxtApp } from "#app";
import { langOptions } from "~/plugins/i18n";

export default defineComponent({
  name: "Index",
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

    const updateLang = () => {
      if (currentLang.value == lang) {
        $router.push("/");
      } else {
        $router.push(`/${currentLang.value}`);
      }
    };
    return {
      updateLang,
      langOptions,
      currentLang,
      i18n: $i18n,
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
</style>
