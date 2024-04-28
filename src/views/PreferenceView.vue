<script setup lang="ts">
  import SymbolChangeLogList from "@/components/SymbolChangeLogList.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import { isFullScreenScroll } from "@/helpers/isFullScreenScroll";
  import { useApiStore } from "@/stores/apiStore";
  import { useHtmlElStore } from "@/stores/htmlElStore";
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import { useVariablesStore } from "@/stores/variablesStore";
  import type { IComponentHtmlRef } from "@/types";
  import { storeToRefs } from "pinia";
  import { nextTick, onMounted, onUnmounted, ref } from "vue";

  const { selectedSymbolValue, symbolList, lockSelect } =
    storeToRefs(usePreferenceStore());
  const { scrollLogListToLastElement } = usePreferenceStore();
  const { establishWebSocketConnection } = storeToRefs(useApiStore());

  const { headerRef } = storeToRefs(useHtmlElStore());

  const { appBodyPaddingBottom } = useVariablesStore();
  const { logListHeight } = storeToRefs(useVariablesStore());

  const selectRef = ref<IComponentHtmlRef | null>(null);

  const resizeHandler = () => {
    let _logListHeight = "auto";

    if (isFullScreenScroll()) {
      _logListHeight = `${
        window.innerHeight -
        headerRef.value!.clientHeight -
        selectRef.value!.$el.clientHeight -
        appBodyPaddingBottom
      }px`;

      nextTick(() => scrollLogListToLastElement());
    }

    logListHeight.value = _logListHeight;
  };

  onMounted(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    scrollLogListToLastElement();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });
</script>

<template>
  <div class="preference">
    <MySelect
      ref="selectRef"
      v-model="selectedSymbolValue"
      class="preference__select"
      :items="symbolList"
      :dead-lock="establishWebSocketConnection || lockSelect"
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
