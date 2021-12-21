import { defineNuxtPlugin } from "#app";
import { ResizeObserver } from "vue3-resize";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ResizeObserver);
});
