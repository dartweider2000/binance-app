<script setup lang="ts">
  import SymbolChangeLogList from "@/components/SymbolChangeLogList.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import { useHtmlElStore } from "@/stores/htmlElStore";
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import type { IComponentHtmlRef } from "@/types";
  import { storeToRefs } from "pinia";
  import { onMounted, onUnmounted, ref } from "vue";

  const { selectedSymbolValue, symbolList } = storeToRefs(usePreferenceStore());
  const { scrollLogListToLastElement } = usePreferenceStore();
  const { preferenceSelectRef } = storeToRefs(useHtmlElStore());

  const selectRef = ref<IComponentHtmlRef | null>(null);

  onMounted(() => {
    preferenceSelectRef.value = selectRef.value!.$el;

    scrollLogListToLastElement();
  });

  onUnmounted(() => {
    preferenceSelectRef.value = null;
  });
</script>

<template>
  <div class="preference">
    <MySelect
      ref="selectRef"
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
