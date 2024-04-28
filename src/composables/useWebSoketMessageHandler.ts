import { useOrderBookStore } from "@/stores/orderBookStore";
import type { IDepthTableRow, IDepthWebSocketResponse, Order } from "@/types";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";

export const useWebSocketMessageHandler = (
  askOrderList: Ref<IDepthTableRow[]>,
  bidOrderList: Ref<IDepthTableRow[]>,
  localOrderBookLastUpdateId: Ref<number | null>,
) => {
  // Преобразую массив кортежей, которые пришли из API в массив объектов, который буду загонять в таблицу
  const fromTupleArrayToObjArray = (orderList: Order[]): IDepthTableRow[] => {
    return orderList.map(([price, quantity]) => {
      const numPrice = parseFloat(price);
      const numQuantity = parseFloat(quantity);

      return {
        price: numPrice,
        quantity: numQuantity,
        total: numPrice * numQuantity,
      } as IDepthTableRow;
    });
  };

  // Удаляю поле если quantity равно нулю
  const removeZeroQuantityRowsFromArray = (
    orderList: IDepthTableRow[],
  ): IDepthTableRow[] => {
    return orderList.filter(({ quantity }) => quantity);
  };

  // Сокращение массива. Для того, чтобы отсекать старые данные
  const truncateArray = (list: any[]) => {
    const { selectedTableElementsCount } = storeToRefs(useOrderBookStore());

    if (selectedTableElementsCount.value < list.length)
      list.length = selectedTableElementsCount.value;

    return list;
  };

  const depthWebSocketMessageHandler = ({ data }: MessageEvent) => {
    const {
      U: firstUpdateId,
      u: lastUpdateId,
      a: asks,
      b: bids,
    }: IDepthWebSocketResponse = JSON.parse(data);

    // Если firstUpdateId + 1 <= localOrderBookLastUpdateId - это значит, что хотя бы часть данных, которые пришли в сообщении, уже есть в
    // нашем локальном стакане
    // Если lastUpdateId <= localOrderBookLastUpdateId, то это значит, что в нашем локальном стакане данные новее, чем в обновлении
    if (
      firstUpdateId + 1 <= localOrderBookLastUpdateId.value! ||
      lastUpdateId <= localOrderBookLastUpdateId.value!
    )
      return;

    // Привожу обновлённыке данные к нужной форме и удаляю поле с нулевым quantity

    const updateAskData = removeZeroQuantityRowsFromArray(
      fromTupleArrayToObjArray(asks),
    );
    const updateBidData = removeZeroQuantityRowsFromArray(
      fromTupleArrayToObjArray(bids),
    );

    // Сокращаю массив до максимального кол-ва, которое можно выбрать в селекте и обновляю данные

    askOrderList.value = truncateArray([
      ...updateAskData,
      ...askOrderList.value,
    ]);
    bidOrderList.value = truncateArray([
      ...updateBidData,
      ...bidOrderList.value,
    ]);

    // Обновляю после id последнего обновления данных
    localOrderBookLastUpdateId.value = lastUpdateId;
  };

  return {
    depthWebSocketMessageHandler,
    fromTupleArrayToObjArray,
  };
};
