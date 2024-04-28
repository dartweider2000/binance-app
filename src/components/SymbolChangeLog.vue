<script setup lang="ts">
  import type { ILog } from "@/types";

  defineProps<{ log: ILog }>();

  const dateFormatter = (timestamp: number) => {
    const date = new Date(timestamp);

    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };
</script>

<template>
  <div class="log">
    <span class="log__change">
      <span class="log__symbol">{{ log.from }}</span> ->
      <span class="log__symbol">{{ log.to }}</span>
    </span>
    <span class="log__date">{{ dateFormatter(log.date) }}</span>
  </div>
</template>

<style scoped lang="scss">
  @import "@/assets/scss/variables.scss";
  .log {
    @apply p-[10px] shadow rounded-[10px] flex justify-between gap-x-[10px];

    @media (max-width: $mini-mobile-br) {
      @apply grid;
    }
    &__change {
      @apply text-[18px] pr-[16px] flex gap-[10px];
    }
    // .log__date
    &__date {
    }
    &__symbol {
      @apply font-bold;
    }
  }
</style>
