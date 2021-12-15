<template>
  <div>
    <div
      class="w-full h-20 bg-primary rounded-b-3xl flex flex-row justify-center items-center filter drop-shadow-xl z-10"
    >
      <img
        src="~/assets/images/microsoft-translate.png"
        style="height: 80%; width: auto"
      />
      <span class="ml-3 text-4xl text-black font-bold">Microsoft</span>
      <span class="ml-1 text-4xl text-black">Translate</span>
    </div>
    <div class="w-full h-10 flex flex-row justify-center z-20">
      <div
        class="flex flex-row justify-center items-center w-3/4 h-full bg-primary rounded-b-3xl gap-2 z-20 filter drop-shadow-xl"
      >
        <span class="text-black">French</span>
        <div class="pa-5">
          <img src="assets/icons/compare_arrows.png" />
        </div>
        <span class="text-black">English</span>
      </div>
    </div>
    <div class="mt-14 flex flex-col items-center w-full px-16 gap-5">
      <div
        class="flex flex-col w-full h-48 bg-white rounded-3xl filter drop-shadow-xl items-center"
      >
        <div class="flex flex-row w-full justify-end pt-3 pr-3">
          <div><img src="~/assets/icons/clear.png" /></div>
        </div>
        <div class="flex flex-grow flex-col justify-center">
          <span v-if="nativeWordDisplayed" class="text-4xl">{{nativeWord}}</span>
        </div>
      </div>
      <div class="h-12 w-12 transform rotate-45 filter drop-shadow-xl">
        <div
          class="flex flex-row justify-center items-center rounded-lg w-full h-full bg-primary"
        >
          <div
            class="flex flex-row items-center justify-center h-full w-full transform -rotate-45"
          >
            <img v-if="!loading" src="~/assets/icons/g_translate.png" />
            <div v-else class="loader"></div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-48 bg-white flex flex-col rounded-3xl filter drop-shadow-xl items-center"
      >
        <div class="flex flex-row w-full justify-end pt-3 pr-3">
          <div><img src="~/assets/icons/clear.png" /></div>
        </div>
        <div class="flex flex-grow flex-col justify-center">
          <span v-if="foreignWordDisplayed" ref="foreignWordRef" class="text-4xl opacity-0">{{foreignWord}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Word } from "~/components/Card.vue";

export default defineComponent({
  name: "AddingPopup",
  props: {
    word: {
      type: Object as PropType<Word>,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false)
    const nativeWordDisplayed = ref(false)
    const foreignWordDisplayed = ref(true)
    const foreignWordRef = ref(null)
    // TODO: find best way to import worker

    onMounted(() => {
      if(process.client){
        const worker = new Worker("./assets/worker_scripts/addingPopupWorker.js");
        worker.onmessage = function(e) {
          const result = e.data
          switch (result){
            case 1:
              nativeWordDisplayed.value = true
              break;
            case 2:
              loading.value = true
              break;
            case 3:
              // Attention si v-if false alors pas de ref
              // console.log("ref: ", foreignWordRef.value)
              // foreignWordRef.value.classList.add("elementToFadeInAndOut")
              loading.value = false
              break;
            case 4:
              foreignWordDisplayed.value = false
              nativeWordDisplayed.value = false
              break;
          }
        }
      }
    })

    return {
      loading: loading,
      nativeWord: props.word.nativeWord,
      foreignWord: props.word.foreignWord,
      nativeWordDisplayed: nativeWordDisplayed,
      foreignWordDisplayed: foreignWordDisplayed,
      foreignWordRef
    };
  },
});
</script>

<style scoped>

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: spin 1.5s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
