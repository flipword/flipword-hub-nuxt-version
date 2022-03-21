<template>
  <div>
    <Layout />
    <div class="w-full flex flex-row justify-center">
      <div class="mt-32 max-w-screen-md bg-white p-6 rounded-lg">
        <WelcomeExtensionStep1 />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/components/Layout.vue";
import { useNuxtApp } from "#app";
import WelcomeExtensionStep1 from "~/components/WelcomeExtensionStep1.vue";

export default defineComponent({
  name: "WelcomeExtension",
  components: {
    WelcomeExtensionStep1,
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
