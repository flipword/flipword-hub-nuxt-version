<template>
  <div class="flip-card" />
</template>

<script setup lang="ts"></script>

<style scoped>
.flip-card {
  width: 300px;
  height: 420px;
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out box-shadow;
  perspective: 1000px;
}
</style>
