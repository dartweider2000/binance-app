import type { RouteTransitionType } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useVariablesStore = defineStore("variablesStore", () => {
  const routeTransitionName = ref<RouteTransitionType>("none");

  const computedStyles = window.getComputedStyle(document.documentElement);

  const appBodyPaddingBottom = parseInt(
    computedStyles.getPropertyValue("--app-body-padding-bottom"),
  );

  const thresholdHeight = parseInt(
    computedStyles.getPropertyValue("--scroll-threshold-height"),
  );

  const mobileBr = computedStyles.getPropertyValue("--mobile-br");

  const tableComponentHeight = computed({
    get: () =>
      computedStyles.getPropertyValue("--order-book-table-component-height"),
    set: (v: string) =>
      document.documentElement.style.setProperty(
        "--order-book-table-component-height",
        v,
      ),
  });

  const logListHeight = computed({
    get: () => computedStyles.getPropertyPriority("--log-list-height"),
    set: (v: string) =>
      document.documentElement.style.setProperty("--log-list-height", v),
  });

  const tableTitleHeight = computed({
    get: () =>
      computedStyles.getPropertyValue("--order-book-table-title-height"),
    set: (v: string) =>
      document.documentElement.style.setProperty(
        "--order-book-table-title-height",
        `${v}px`,
      ),
  });

  return {
    routeTransitionName,
    appBodyPaddingBottom,
    thresholdHeight,
    tableComponentHeight,
    logListHeight,
    mobileBr,
    tableTitleHeight,
  };
});
