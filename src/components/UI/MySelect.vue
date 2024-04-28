<script setup lang="ts">
  import type { SelectOption, IOption } from "@/types";

  withDefaults(
    defineProps<{
      items: string[] | IOption[];
      deadLock?: boolean;
    }>(),
    {
      deadLock: false,
    },
  );

  const value = defineModel<SelectOption>();
</script>

<template>
  <VSelect
    v-model="value"
    :items="items"
    variant="solo-filled"
    :readonly="deadLock"
  />
</template>

<style scoped lang="scss"></style>
