<script setup lang="ts">
  import { useBinanceStore } from "@/stores/binanceStore";
  import { storeToRefs } from "pinia";
  import SymbolChangeLog from "@/components/SymbolChangeLog.vue";

  const { logList } = storeToRefs(useBinanceStore());
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

<style scoped lang="scss"></style>
