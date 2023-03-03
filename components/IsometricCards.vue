<template>
  <div class="flex flex-row">
    <div class="isometric flex flex-col gap-14">
      <EmptyCard />
      <EmptyCard />
      <EmptyCard />
      <Card
        :native-word="wordList[props.nativeLang][0]"
        :foreign-word="wordList[props.foreignLang][0]"
      />
    </div>
    <div class="isometric flex flex-col gap-14 pl-24 -mt-24">
      <EmptyCard />
      <EmptyCard />
      <Card
        :native-word="wordList[props.nativeLang][1]"
        :foreign-word="wordList[props.foreignLang][1]"
      />
      <Card
        :native-word="wordList[props.nativeLang][2]"
        :foreign-word="wordList[props.foreignLang][2]"
      />
    </div>
    <div class="isometric flex flex-col gap-14 pl-36 -mt-36">
      <EmptyCard />
      <Card
        :native-word="wordList[props.nativeLang][3]"
        :foreign-word="wordList[props.foreignLang][3]"
      />
      <Card
        :native-word="wordList[props.nativeLang][4]"
        :foreign-word="wordList[props.foreignLang][4]"
      />
      <Card
        :native-word="wordList[props.nativeLang][5]"
        :foreign-word="wordList[props.foreignLang][5]"
      />
    </div>
    <div class="isometric flex flex-col gap-14 pl-44 -mt-44">
      <Card
        :native-word="wordList[props.nativeLang][6]"
        :foreign-word="wordList[props.foreignLang][6]"
      />
      <Card
        :native-word="wordList[props.nativeLang][7]"
        :foreign-word="wordList[props.foreignLang][7]"
      />
      <Card
        :native-word="wordList[props.nativeLang][8]"
        :foreign-word="wordList[props.foreignLang][8]"
      />
      <EmptyCard />
    </div>
    <div class="isometric flex flex-col gap-14 pl-32 -mt-64">
      <EmptyCard />
      <Card
        :native-word="wordList[props.nativeLang][9]"
        :foreign-word="wordList[props.foreignLang][9]"
      />
      <EmptyCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "../components/Card.vue";
import EmptyCard from "../components/EmptyCard.vue";
import { wordList } from "assets/data/words";

const props = defineProps({
  nativeLang: {
    type: String,
    required: true,
  },
  foreignLang: {
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
