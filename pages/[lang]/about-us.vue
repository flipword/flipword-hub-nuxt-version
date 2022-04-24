<template>
  <NuxtLayout name="light-layout">
    <Profile
      name="Adrien Croquelois"
      :description="$t('profile_presentation')"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Profile from "~/components/Profile.vue";
import { useNuxtApp, useHead } from "#app";

const {
  $i18n: { $t },
} = useNuxtApp();

const getTitle = () => `- ${$t("about_us")}`;

useHead({
  title: computed(() => `Flipword ${$t("about_us") ? getTitle() : ""}`),
  layout: "custom",
});
</script>
