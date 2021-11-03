<template>
  <div
    class="w-full h-full flex flex-row gap-32 ml-48 md:mt-6 xl:mt-12 4xl:mt-24"
  >
    <div class="isometric flex flex-col gap-5 mt-48">
      <Card native-word="Mot" foreign-word="Word" />
    </div>
    <div class="isometric flex flex-col gap-5 -ml-48">
      <Card native-word="Mot" foreign-word="Word" />
      <Card native-word="Vache" foreign-word="Cow" />
    </div>
    <div class="isometric flex flex-col gap-5 -mt-48 -ml-48">
      <Card native-word="Mot" foreign-word="Word" />
      <Card native-word="Vache" foreign-word="Cow" />
      <Card native-word="Vache" foreign-word="Cow" />
    </div>
    <div class="isometric flex flex-col gap-5 -mt-96 -ml-48">
      <Card native-word="Mot" foreign-word="Word" />
      <Card native-word="Vache" foreign-word="Cow" />
      <Card native-word="Vache" foreign-word="Cow" />
      <Card native-word="Vache" foreign-word="Cows" />
    </div>
    <div class="isometric flex flex-col gap-5 -mt-110 -ml-12">
      <Card native-word="Mot" foreign-word="Word" />
      <Card native-word="Vache" foreign-word="Cow" />
      <Card native-word="Vache" foreign-word="Cow" />
      <Card native-word="Vache" foreign-word="Cows" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";

export default defineComponent({
  name: "IsometricCards",
  components: { Card },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.isometric {
  transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
}
</style>
