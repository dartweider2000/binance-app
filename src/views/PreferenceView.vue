<script setup lang="ts">
  import SymbolChangeLogList from "@/components/SymbolChangeLogList.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import { isFullScreenScroll } from "@/helpers/isFullScreenScroll";
  import { useHtmlElStore } from "@/stores/htmlElStore";
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import type { IComponentHtmlRef } from "@/types";
  import { storeToRefs } from "pinia";
  import { nextTick, onMounted, onUnmounted, ref } from "vue";

  const { selectedSymbolValue, symbolList } = storeToRefs(usePreferenceStore());
  const { scrollLogListToLastElement } = usePreferenceStore();

  const { headerRef } = storeToRefs(useHtmlElStore());
  const { appBodyPaddingBottom } = useHtmlElStore();

  const selectRef = ref<IComponentHtmlRef | null>(null);

  const resizeHandler = () => {
    let logListHeight = "auto";

    if (isFullScreenScroll()) {
      logListHeight = `${
        window.innerHeight -
        headerRef.value!.clientHeight -
        selectRef.value!.$el.clientHeight -
        appBodyPaddingBottom
      }px`;

      nextTick(() => scrollLogListToLastElement());
    }

    document.documentElement.style.setProperty(
      "--log-list-height",
      logListHeight,
    );
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
