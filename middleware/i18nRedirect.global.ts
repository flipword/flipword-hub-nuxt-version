import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.lang) {
    console.log("from")
    console.log("lang: ", to.params.lang);
  }
});
