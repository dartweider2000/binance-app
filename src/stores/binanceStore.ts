import type { ILog } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBinanceStore = defineStore("binanceStore", () => {
  const symbolList = ref<string[]>(["BTCUSDT", "BNBBTC", "ETHBTC"]);
  const selectedSymbolValue = ref<string>("BTCUSDT");

  const logList = ref<ILog[]>([]);

  return {
    symbolList,
    selectedSymbolValue,
    logList,
  };
});
