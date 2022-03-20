<template>
  <div>
    <Profil
      name="Adrien Croquelois"
      description="Hello there, I'm 23 and I love building quality software. "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Profil from "~/components/Profil.vue";
import { useNuxtApp, useMeta } from "#app";

export default defineComponent({
  name: "AboutUs",
  components: {
    Profil,
  },
  setup() {
    const { $i18n } = useNuxtApp();
    const getTitle = () => `- ${$i18n("about_us")}`;

    useMeta({
      title: computed(() => `Flipword ${$i18n("about_us") ? getTitle() : ""}`),
    });

    return {};
  },
});
</script>

<style scoped></style>
