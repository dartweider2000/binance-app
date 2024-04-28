import type { RouteTransitionType } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useVariablesStore = defineStore("variablesStore", () => {
  const routeTransitionName = ref<RouteTransitionType>("right");

  return {
    routeTransitionName,
  };
});
