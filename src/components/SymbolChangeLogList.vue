<script setup lang="ts">
  import { usePreferenceStore } from "@/stores/preferenceStore";
  import { storeToRefs } from "pinia";
  import SymbolChangeLog from "@/components/SymbolChangeLog.vue";

  const { logList } = storeToRefs(usePreferenceStore());
</script>

<template>
  <Transition name="switch" mode="out-in">
    <TransitionGroup
      v-if="logList.length"
      name="group"
      tag="div"
      class="log-list"
    >
      <SymbolChangeLog v-for="log in logList" :key="log.date" :log="log" />
    </TransitionGroup>
    <div v-else class="empty">Логов нет</div>
  </Transition>
</template>

<style scoped lang="scss">
  .log-list {
    @apply grid gap-[10px];
  }
  .empty {
    @apply text-center p-[10px];
  }
</style>
