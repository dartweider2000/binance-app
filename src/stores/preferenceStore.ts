import type { ILog } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { nextTick, ref, watch } from "vue";
import { useHtmlElStore } from "./htmlElStore";
import { useOrderBookStore } from "./orderBookStore";

export const usePreferenceStore = defineStore("preferenceStore", () => {
  const symbolList = ref<string[]>(["BTCUSDT", "BNBBTC", "ETHBTC"]);
  const selectedSymbolValue = ref<string>(symbolList.value[0]);

  const logList = ref<ILog[]>([]);

  const addLog = (log: ILog) => logList.value.push(log);

  const { logListRef } = storeToRefs(useHtmlElStore());

  // Скролю до последнего элемента в списке логов
  const scrollLogListToLastElement = () => {
    logListRef.value?.scrollTo({
      top: logListRef.value!.scrollHeight,
      behavior: "smooth",
    });
  };

  const { getOrderBookSnapshot } = useOrderBookStore();

  const lockSelect = ref<boolean>(false);

  watch(
    selectedSymbolValue,
    async (value: string, oldValue?: string) => {
      try {
        lockSelect.value = true;

        if (oldValue !== undefined)
          addLog({
            from: oldValue,
            to: value,
            date: Date.now(),
          });

        // Делаю снимок стакана + подписка на WebSocket
        await getOrderBookSnapshot(value);
        lockSelect.value = false;

        // Выполняем функцию после изменения DOM дерева
        nextTick(() => scrollLogListToLastElement());
      } catch (e) {
        if (logList.value.length) {
          logList.value.pop();
        }

        console.log((e as Error).message);
      } finally {
        lockSelect.value = false;
      }
    },
    { immediate: true },
  );

  return {
    symbolList,
    selectedSymbolValue,
    logList,
    addLog,
    scrollLogListToLastElement,
    lockSelect,
  };
});
