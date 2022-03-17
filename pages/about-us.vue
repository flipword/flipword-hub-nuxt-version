<template>
  <div>
    <Profil
      name="Adrien Croquelois"
      description="Hello there, I'm 23 and I love building quality software. "
    />
  </div>
</template>

<script lang="ts" setup>
import Profil from "~/components/Profil.vue";

definePageMeta({
  title: "Flipword - About-us",
});
</script>

<style scoped></style>
