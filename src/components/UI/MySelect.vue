<script setup lang="ts">
  import type { SelectOption, IOption } from "@/types";

  defineProps<{
    items: string[] | IOption[];
  }>();

  const value = defineModel<SelectOption>();
</script>

<template>
  <VSelect v-model="value" :items="items" variant="solo-filled" />
</template>

<style scoped lang="scss"></style>
