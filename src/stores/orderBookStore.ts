import type { IDepthTableRow, IOption, ITableHeader } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useApiStore } from "@/stores/apiStore";
import { useWebSocketMessageHandler } from "@/composables/useWebSocketMessageHandler";
import { useVariablesStore } from "@/stores/variablesStore";

export const useOrderBookStore = defineStore("orderBookStore", () => {
  const tableElementsCountList = ref<IOption[]>([
    { title: "100", value: 100 },
    { title: "500", value: 500 },
    { title: "1000", value: 1000 },
  ]);
  const selectedTableElementsCount = ref<number>(
    +tableElementsCountList.value[0].value,
  );

  const tableHeaders = ref<ITableHeader[]>([
    {
      title: "Price",
      key: "price",
      align: "start",
    },
    {
      title: "Quantity",
      key: "quantity",
      align: "end",
    },
  ]);

  const totalHeader: ITableHeader = {
    title: "Total",
    key: "total",
    align: "end",
  };

  // Зона отвечает за то, чтобы на мобильном разрешении убирать лишний столбец и добавлять его на десктопе

  const { mobileBr } = useVariablesStore();
  const mathMedia = matchMedia(`(max-width: ${mobileBr})`);

  const mathMediaChangeHandler = () => {
    if (mathMedia.matches) {
      if (tableHeaders.value.includes(totalHeader))
        tableHeaders.value.splice(tableHeaders.value.indexOf(totalHeader), 1);
    } else {
      tableHeaders.value.push(totalHeader);
    }
  };

  mathMediaChangeHandler();
  mathMedia.addEventListener("change", mathMediaChangeHandler);

  //

  const bidOrderList = ref<IDepthTableRow[]>([]);
  const askOrderList = ref<IDepthTableRow[]>([]);

  const { getDepthSnapshot, startDepthWebSocketConnection } = useApiStore();
  const localOrderBookLastUpdateId = ref<number | null>(null);

  // Хук, в котором содержится обработчик события message у WebSocket, а так же вспомогательные функции для обработки данных
  const { depthWebSocketMessageHandler, fromTupleArrayToObjArray } =
    useWebSocketMessageHandler(
      askOrderList,
      bidOrderList,
      localOrderBookLastUpdateId,
    );

  // Делаю снимок стакана по REST, преобразую данные и подписываюсь на обновление стакана по WebSocket
  const getOrderBookSnapshot = async (symbol: string) => {
    const { asks, bids, lastUpdateId } = await getDepthSnapshot(
      symbol,
      selectedTableElementsCount.value,
    );

    localOrderBookLastUpdateId.value = lastUpdateId;

    askOrderList.value = fromTupleArrayToObjArray(asks);
    bidOrderList.value = fromTupleArrayToObjArray(bids);

    startDepthWebSocketConnection(symbol, depthWebSocketMessageHandler);
  };

  return {
    tableElementsCountList,
    selectedTableElementsCount,
    bidOrderList,
    askOrderList,
    tableHeaders,
    getOrderBookSnapshot,
  };
});
