<template>
  <div class="flex justify-between">
    <span class="text-4xl">Flipword tell you: {{ i18n("greeting") }}</span>
    <select
      v-if="currentLang"
      v-model="currentLang"
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
