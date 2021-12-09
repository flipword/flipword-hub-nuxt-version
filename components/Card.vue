<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex flex-col justify-between">
        <div class="flex flex-row justify-end pr-3 pt-3">
          <img src="assets/icons/volume.png" />
        </div>
        <div class="flex flex-row mb-7 justify-center">
          <span class="font-sans text-4xl text-black">{{
            word.foreignWord
          }}</span>
        </div>
        <div></div>
      </div>
      <div class="flip-card-back flex flex-col justify-between">
        <div class="flex flex-row justify-end pr-3 pt-3">
          <img src="assets/icons/volume.png" />
        </div>
        <div class="flex flex-row mb-7 justify-center">
          <span class="font-sans text-4xl text-black">{{
            word.nativeWord
          }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface Word {
  nativeWord: string;
  foreignWord: string;
}

export default defineComponent({
  name: "Card",
  props: {
    word: {
      type: Word,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 240px;
  height: 320px;
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out box-shadow;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 0.75rem;
  box-shadow: -2px 2px 0 1px rgba(34, 33, 81, 0.15);
}

.flip-card-front {
  background-color: #ffffff;
}

.flip-card-back {
  background-color: #ffffff;
  transform: rotateY(180deg);
}
</style>
