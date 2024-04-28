<script setup lang="ts">
  import { useOrderBookStore } from "@/stores/orderBookStore";
  import type { IDepthTableRow } from "@/types";
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  defineProps<{
    data: IDepthTableRow[];
    title: string;
  }>();

  const { tableHeaders } = storeToRefs(useOrderBookStore());
  const titleRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    document.documentElement.style.setProperty(
      "--order-book-table-title-height",
      `${titleRef.value?.clientHeight}px`,
    );
  });
</script>

<template>
  <div class="table">
    <h2 ref="titleRef" class="table__title">{{ title }}</h2>
    <VDataTableVirtual
      class="table__el"
      fixed-header
      :headers="tableHeaders"
      :items="data"
    />
  </div>
</template>

<style scoped lang="scss">
  .table {
    @apply min-w-0;
    // .table__title
    &__title {
      @apply text-[16px] font-medium;
    }
    // .table__el
    &__el {
      // @apply pb-[10px];

      height: calc(
        var(--order-book-table-component-height) - var(
            --order-book-table-title-height
          )
      );
    }
  }
</style>
