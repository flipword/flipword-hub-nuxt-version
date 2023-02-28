<template>
  <div class="flex flex-row">
    <div class="isometric flex flex-col gap-14">
      <EmptyCard />
      <EmptyCard />
      <EmptyCard />
      <Card :word="wordList[props.lang][0]" />
    </div>
    <div class="isometric flex flex-col gap-14 pl-24 -mt-24">
      <EmptyCard />
      <EmptyCard />
      <Card :word="wordList[props.lang][1]" />
      <Card :word="wordList[props.lang][2]" />
    </div>
    <div class="isometric flex flex-col gap-14 pl-36 -mt-36">
      <EmptyCard />
      <Card :word="wordList[props.lang][3]" />
      <Card :word="wordList[props.lang][4]" />
      <Card :word="wordList[props.lang][5]" />
    </div>
    <div class="isometric flex flex-col gap-14 pl-44 -mt-44">
      <Card :word="wordList[props.lang][6]" />
      <Card :word="wordList[props.lang][7]" />
      <Card :word="wordList[props.lang][8]" />
      <EmptyCard />
    </div>
    <div class="isometric flex flex-col gap-14 pl-32 -mt-64">
      <EmptyCard />
      <Card :word="wordList[props.lang][9]" />
      <EmptyCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "../components/Card.vue";
import EmptyCard from "../components/EmptyCard.vue";
import { wordList } from "assets/data/words";

const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.isometric {
  transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
}
</style>
