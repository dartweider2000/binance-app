<script setup lang="ts">
  import MySelect from "@/components/UI/MySelect.vue";
  import OrderBookTable from "@/components/UI/OrderBookTable.vue";
  import { isFullScreenScroll } from "@/helpers/isFullScreenScroll";
  import { useHtmlElStore } from "@/stores/htmlElStore";
  import { useOrderBookStore } from "@/stores/orderBookStore";
  import type { IComponentHtmlRef } from "@/types";
  import { storeToRefs } from "pinia";
  import { onMounted, onUnmounted, ref } from "vue";

  const { tableElementsCountList, selectedTableElementsCount, bidOrderList } =
    storeToRefs(useOrderBookStore());

  const { headerRef } = storeToRefs(useHtmlElStore());
  const { appBodyPaddingBottom } = useHtmlElStore();

  const selectRef = ref<IComponentHtmlRef | null>(null);

  const resizeHandler = () => {
    let tableHeight = "auto";

    if (isFullScreenScroll())
      tableHeight = `${
        window.innerHeight -
        headerRef.value!.clientHeight -
        selectRef.value!.$el.clientHeight -
        appBodyPaddingBottom
      }px`;

    document.documentElement.style.setProperty(
      "--order-book-table-component-height",
      tableHeight,
    );
  };

  onMounted(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });
</script>

<template>
  <div class="order-book">
    <MySelect
      ref="selectRef"
      v-model="selectedTableElementsCount"
      class="order-book__select"
      :items="tableElementsCountList"
    />
    <div class="order-book__table-area">
      <OrderBookTable :data="bidOrderList" title="Bids" />
      <OrderBookTable :data="bidOrderList" title="Asks" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .order-book {
    // .order-book__select
    &__select {
    }
    // .order-book__table-area
    &__table-area {
      @apply flex gap-[20px] justify-between;

      & > * {
        @apply flex-1 basis-[50%];
      }
    }
  }
</style>
