<script setup lang="ts">
  import SymbolChangeLogList from "@/components/SymbolChangeLogList.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import type { IDepth } from "@/types";
  import { storeToRefs } from "pinia";

  const { selectedSymbolValue, symbolList } = storeToRefs(usePreferenceStore());
</script>

<template>
  <div class="preference">
    <MySelect
      v-model="selectedSymbolValue"
      class="preference__select"
      :items="symbolList"
    />
    <SymbolChangeLogList class="preference__list" />
  </div>
</template>

<style scoped lang="scss">
  .preference {
    // .preference__select
    &__select {
    }
    // .preference__list
    &__list {
    }
  }
</style>
