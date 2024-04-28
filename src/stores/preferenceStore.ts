import type { ILog } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { nextTick, ref, watch } from "vue";
import { useHtmlElStore } from "./htmlElStore";

export const usePreferenceStore = defineStore("preferenceStore", () => {
  const symbolList = ref<string[]>(["BTCUSDT", "BNBBTC", "ETHBTC"]);
  const selectedSymbolValue = ref<string>(symbolList.value[0]);

  const logList = ref<ILog[]>([]);

  const addLog = (log: ILog) => logList.value.push(log);

  const { logListRef } = storeToRefs(useHtmlElStore());
  const scrollLogListToLastElement = () => {
    logListRef.value?.scrollTo({
      top: logListRef.value!.scrollHeight,
      behavior: "smooth",
    });
  };

  watch(selectedSymbolValue, (value: string, oldValue: string) => {
    addLog({
      from: oldValue,
      to: value,
      date: Date.now(),
    });

    // Выполняем функцию после изменения DOM дерева
    nextTick(() => scrollLogListToLastElement());
  });

  return {
    symbolList,
    selectedSymbolValue,
    logList,
    addLog,
    scrollLogListToLastElement,
  };
});
