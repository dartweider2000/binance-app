import type { IDepthTableRow, IOption, ITableHeader } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useApiStore } from "@/stores/apiStore";
import { usePreferenceStore } from "@/stores/preferenceStore";
import { useWebSocketMessageHandler } from "@/composables/useWebSoketMessageHandler";

export const useOrderBookStore = defineStore("orderBookStore", () => {
  const tableElementsCountList = ref<IOption[]>([
    { title: "100", value: 100 },
    { title: "500", value: 500 },
    { title: "1000", value: 1000 },
  ]);
  const selectedTableElementsCount = ref<IOption>(
    tableElementsCountList.value[0],
  );

  const tableHeaders = ref<ITableHeader[]>([
    {
      title: "Price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
    },
  ]);

  const totalHeader: ITableHeader = {
    title: "Total",
    key: "total",
  };

  // Зона отвечает за то, чтобы на мобильном разрешении убирать лишний столбец и добавлять его на десктопе

  const mathMedia = matchMedia(
    `(max-width: ${window.getComputedStyle(document.documentElement).getPropertyValue("--mobile-br")})`,
  );

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

  const {
    depthWebSocketMessageHandler,
    fromTupleArrayToObjArray,
    truncateArray,
  } = useWebSocketMessageHandler(
    askOrderList,
    bidOrderList,
    localOrderBookLastUpdateId,
  );

  // Делаю снимок стакана по REST, преобразую данные и подписываюсь на обновление стакана по WebSocket
  const getOrderBookSnapshot = async () => {
    const { selectedSymbolValue } = storeToRefs(usePreferenceStore());
    console.log(selectedSymbolValue);

    const { asks, bids, lastUpdateId } = await getDepthSnapshot(
      selectedSymbolValue.value,
    );

    localOrderBookLastUpdateId.value = lastUpdateId;

    askOrderList.value = truncateArray(fromTupleArrayToObjArray(asks));
    bidOrderList.value = truncateArray(fromTupleArrayToObjArray(bids));

    startDepthWebSocketConnection(
      selectedSymbolValue.value,
      depthWebSocketMessageHandler,
    );

    console.log(askOrderList.value);
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
