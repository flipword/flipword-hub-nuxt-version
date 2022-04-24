<template>
    <div class="flex flex-row w-full justify-center mt-32">
      <div class="flex flex-col items-center w-80">
        <div
          class="h-52 w-52 bg-primary rounded-full overflow-hidden border-primary border-4 z-20"
        >
          <img src="~/assets/images/pictures/croquelois.jpg" />
        </div>
        <div
          class="flex flex-col w-full rounded-lg bg-primary px-5 pt-8 pb-4 -mt-8 gap-4"
        >
          <span class="text-center font-bold">{{ props.name }}</span>
          <span>{{ props.description }}</span>
          <div class="flex flex-row w-full justify-end gap-2">
            <img
              class="h-8 w-auto cursor-pointer"
              src="~/assets/images/twitter.png"
              @click="redirectToSocialNetwork(socialNetwork.Twitter)"
            />
            <img
              class="h-8 w-auto cursor-pointer"
              src="~/assets/images/linkedin.png"
              @click="redirectToSocialNetwork(socialNetwork.Linkedin)"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNuxtApp } from "#app";

enum SocialNetwork {
  Linkedin,
  Twitter,
}

export default defineComponent({
  name: "Profile",
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    }
  },
  setup(props) {
    const { $router } = useNuxtApp();

    const redirectToSocialNetwork = (socialNetwork: SocialNetwork) => {
      let redirectUrl = "";
      switch (socialNetwork) {
        case SocialNetwork.Linkedin:
          redirectUrl = "https://www.linkedin.com/in/adrien-croquelois-ab065a143";
          break;
        case SocialNetwork.Twitter:
          redirectUrl = "https://twitter.com/a_croquelois";
          break
      }
      if(redirectUrl){
        window.open(redirectUrl)
      }
    };
    return {
      props,
      router: $router,
      socialNetwork: SocialNetwork,
      redirectToSocialNetwork,
    };
  },
});
</script>

<style scoped></style>
