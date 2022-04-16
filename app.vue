<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import "./assets/css/tailwind.css";
import "./assets/css/default.css";
import "vue3-resize/dist/vue3-resize.css";
import { useHead } from "#app";

useHead({
  meta: [
    {
      property: "og:title",
      content: "Flipword",
    },
    {
      property: "og:image",
      content:
        "https://storage.googleapis.com/flutter-flip-card.appspot.com/site_thumbnail.png",
    },
    {
      property: "og:description",
      content: "Learn foreign language vocabulary easily and quickly!",
    },
    {
      property: "og:url",
      content: "https://flipword.io",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "627",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>
