<template>
  <div class="flex flex-row gap-2">
    <div class="flex flex-col pt-2">
      <img :src="`/flags/${flagPath}`" style="height: 100%; width: 40px" />
    </div>
    <select
      v-if="currentLang"
      class="mr-5 mt-2 country-select"
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
import { defineComponent, ref } from "vue";
import { langOptions, flagPaths } from "~/plugins/i18n";

export default defineComponent({
  name: "CountrySelect",
  props: {
    currentLang: { default: "", type: String },
  },
  emits: ["changeLang"],
  setup(props, { emit }) {
    const flagPath = ref(flagPaths[props.currentLang]);
    const updateLang = (event: any) => {
      emit("changeLang", event.target.value);
    };
    return {
      langOptions,
      updateLang,
      flagPath,
    };
  },
});
</script>

<style scoped>
.country-select {
  background-color: transparent;
  outline: none;
}
</style>
