import { defineStore } from "pinia";
import { ref } from "vue";

export const useHtmlElStore = defineStore("htmlElStore", () => {
  const headerRef = ref<HTMLElement | null>(null);
  const preferenceSelectRef = ref<HTMLElement | null>(null);
  const logListRef = ref<HTMLElement | null>(null);
  return {
    headerRef,
    preferenceSelectRef,
    logListRef,
  };
});
