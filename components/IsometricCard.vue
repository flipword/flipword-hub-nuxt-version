<template>
  <div class="isometric-card"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IsometricCard",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.isometric-card {
  margin: 0 auto;
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  background-color: #fcfcfc;
  will-change: transform;
  width: 240px;
  height: 320px;
  border-radius: 1rem;
  box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    2px 2px 2px 2px rgba(34, 33, 81, 0.25);
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out box-shadow;
}
</style>
