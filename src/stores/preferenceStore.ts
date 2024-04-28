import type { ILog } from "@/types";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePreferenceStore = defineStore("preferenceStore", () => {
  const symbolList = ref<string[]>(["BTCUSDT", "BNBBTC", "ETHBTC"]);
  const selectedSymbolValue = ref<string>("BTCUSDT");

  const logList = ref<ILog[]>([]);

  const addLog = (log: ILog) => logList.value.push(log);

  watch(selectedSymbolValue, async (value: string, oldValue: string) => {
    addLog({
      from: oldValue,
      to: value,
      date: Date.now(),
    });
  });

  return {
    symbolList,
    selectedSymbolValue,
    logList,
    addLog,
  };
});
