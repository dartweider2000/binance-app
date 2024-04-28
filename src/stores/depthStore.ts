import { defineStore } from "pinia";
import { ref } from "vue";

export const useDepthStore = defineStore("depthStore", () => {
  const orderBook = ref();

  const lastUpdateId = ref<number | null>(null);
});
