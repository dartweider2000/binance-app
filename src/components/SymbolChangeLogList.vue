<script setup lang="ts">
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import { storeToRefs } from "pinia";
  import SymbolChangeLog from "@/components/SymbolChangeLog.vue";
  import { useHtmlElStore } from "@/stores/htmlElStore";

  const { logList } = storeToRefs(usePreferenceStore());
  const { logListRef } = storeToRefs(useHtmlElStore());
</script>

<template>
  <div ref="logListRef" class="log-list">
    <Transition name="switch" mode="out-in">
      <TransitionGroup
        v-if="logList.length"
        name="group"
        tag="div"
        class="log-list__el"
        appear
      >
        <SymbolChangeLog v-for="log in logList" :key="log.date" :log="log" />
      </TransitionGroup>
      <div v-else class="log-list__empty">Логов нет</div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
  .log-list {
    @apply h-[--log-list-height] overflow-y-auto overflow-x-hidden p-[3px] m-[-3px] pt-[1px] mt-[-1px];
    // .log-list__el
    &__el {
      @apply grid gap-[10px];
    }
    // .log-list__empty
    &__empty {
      @apply text-center p-[10px] text-[22px] font-medium;
    }
  }

  .group-enter-from,
  .group-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }

  .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    transform: translate(0, 50px);
  }

  .group-enter-active,
  .group-leave-active,
  .switch-enter-active,
  .switch-leave-active {
    transition: all 0.4s ease 0s;
  }
</style>
