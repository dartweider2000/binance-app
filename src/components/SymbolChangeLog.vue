<script setup lang="ts">
  import type { ILog } from "@/types";

  defineProps<{ log: ILog }>();
</script>

<template>
  <div class="log">
    <span class="log__change">
      Перешёл с пары {{ log.from }} на {{ log.to }}
    </span>
    <span class="log__date">{{ log.date }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
