<template>
  <NuxtLayout name="base-layout">
    <Profile
      name="Adrien Croquelois"
      :description="i18n('profile_presentation')"
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
    const { $i18n } = useNuxtApp();
    const getTitle = () => `- ${$i18n("about_us")}`;

    useMeta({
      title: computed(() => `Flipword ${$i18n("about_us") ? getTitle() : ""}`),
      layout: "custom",
    });

    return {
      i18n: $i18n,
    };
  },
});
</script>

<style scoped></style>
