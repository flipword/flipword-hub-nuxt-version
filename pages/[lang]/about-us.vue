<template>
  <div>
    <Layout />
    <Profil
      name="Adrien Croquelois"
      :description="i18n('profile_presentation')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Profil from "~/components/Profil.vue";
import Layout from "~/components/Layout.vue";
import { useNuxtApp, useMeta } from "#app";

export default defineComponent({
  name: "AboutUs",
  components: {
    Profil,
    Layout,
  },
  setup() {
    const { $i18n } = useNuxtApp();
    const getTitle = () => `- ${$i18n("about_us")}`;

    useMeta({
      title: computed(() => `Flipword ${$i18n("about_us") ? getTitle() : ""}`),
    });

    return {
      i18n: $i18n,
    };
  },
});
</script>

<style scoped></style>
