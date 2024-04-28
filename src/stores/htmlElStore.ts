import { defineStore } from "pinia";
import { ref } from "vue";

export const useHtmlElStore = defineStore("htmlElStore", () => {
  const headerRef = ref<HTMLElement | null>(null);
  const preferenceSelectRef = ref<HTMLElement | null>(null);
  const logListRef = ref<HTMLElement | null>(null);

  const computedStyles = window.getComputedStyle(document.documentElement);

  const appBodyPaddingBottom = parseInt(
    computedStyles.getPropertyValue("--app-body-padding-bottom"),
  );

  const thresholdHeight = parseInt(
    computedStyles.getPropertyValue("--scroll-threshold-height"),
  );

  return {
    headerRef,
    preferenceSelectRef,
    logListRef,

    appBodyPaddingBottom,
    thresholdHeight,
  };
});
