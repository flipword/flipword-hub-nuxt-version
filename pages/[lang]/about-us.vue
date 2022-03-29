<template>
  <NuxtLayout name="base-layout">
    <Profile
      name="Adrien Croquelois"
      :description="t('profile_presentation')"
    />
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Profile from "~/components/Profile.vue";
import { useNuxtApp, useMeta } from "#app";

export default defineComponent({
  name: "AboutUs",
  components: {
    Profile,
  },
  setup() {
    const {
      $i18n: { $t },
    } = useNuxtApp();

    const getTitle = () => `- ${$t("about_us")}`;

    useMeta({
      title: computed(() => `Flipword ${$t("about_us") ? getTitle() : ""}`),
      layout: "custom",
    });

    return {
      t: $t,
    };
  },
});
</script>

<style scoped></style>
