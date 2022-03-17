<template>
  <div>
    <Layout />
    <div class="w-full flex flex-row justify-center">
      <div class="mt-32 w-60 h-52 bg-white"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/components/Layout.vue";
import { useNuxtApp } from "#app";

export default defineComponent({
  name: "WelcomeExtension",
  components: {
    Layout,
  },
  setup() {
    const { $i18n } = useNuxtApp();
    return {
      i18n: $i18n,
    };
  },
});
</script>

<style scoped></style>
