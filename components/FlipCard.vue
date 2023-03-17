<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex flex-col justify-between">
        <div class="flex flex-row justify-end pr-3 pt-3">
          <img
            src="~/assets/icons/volume.svg"
            style="width: 1vw; height: auto"
          />
        </div>
        <div class="flex flex-row mb-7 justify-center">
          <span class="font-sans text-black 2xl:text-3xl xl:text-2xl text-xl">{{
            props.foreignWord
          }}</span>
        </div>
        <div></div>
      </div>
      <div class="flip-card-back flex flex-col justify-between">
        <div class="flex flex-row justify-end pr-3 pt-3">
          <img
            src="~/assets/icons/volume.svg"
            style="width: 1vw; height: auto"
          />
        </div>
        <div class="flex flex-row mb-7 justify-center">
          <span class="font-sans text-black 2xl:text-3xl xl:text-2xl text-xl">{{
            props.nativeWord
          }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  nativeWord: {
    type: String,
    required: true,
  },
  foreignWord: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 11vw;
  height: 16vw;
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
  border-radius: 1vw;
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
