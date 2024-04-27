<script setup lang="ts">
  import SymbolChangeLogList from "@/components/SymbolChangeLogList.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import { useBinanceStore } from "@/stores/binanceStore";
  import { storeToRefs } from "pinia";
  import { watch } from "vue";

  const { selectedSymbolValue, symbolList } = storeToRefs(useBinanceStore());

  watch(selectedSymbolValue, (value: string, oldValue: string) => {
    console.log(value, oldValue);
  });
</script>

<template>
  <div class="preference">
    <MySelect
      v-model="selectedSymbolValue"
      class="preference__select"
      :items="symbolList"
    />
    <SymbolChangeLogList />
  </div>
</template>

<style scoped lang="scss"></style>
