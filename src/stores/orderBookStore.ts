import type { IDepthTableRow, IOption, ITableHeader } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

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

  const bidOrderList = ref<IDepthTableRow[]>([
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
    { price: 100, quantity: 50, total: 30 },
  ]);

  const orderBook = ref();

  const lastUpdateId = ref<number | null>(null);

  return {
    tableElementsCountList,
    selectedTableElementsCount,
    bidOrderList,
    tableHeaders,
  };
});
