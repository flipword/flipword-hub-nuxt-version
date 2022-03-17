<template>
  <div>
    <Layout />
    <Profil
      name="Adrien Croquelois"
      description="Hello there, I'm 23 and I love building quality software. "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Profil from "~/components/Profil.vue";
import Layout from "~/components/Layout.vue";

export default defineComponent({
  name: "AboutUs",
  components: {
    Profil,
    Layout,
  },
  setup() {},
});
</script>

<style scoped></style>
