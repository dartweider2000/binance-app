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
    {
      title: "Total",
      key: "total",
    },
  ]);

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
