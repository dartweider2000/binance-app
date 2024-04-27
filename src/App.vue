<script setup lang="ts">
  import NavHeader from "@/components/NavHeader.vue";
</script>

<template>
  <div class="app">
    <div class="container">
      <NavHeader class="app__header" />
      <div class="app__body">
        <RouterView #default="{ Component }">
          <Transition name="view" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .app {
    @apply grid gap-[10px] grid-rows-[auto,1fr] min-h-dvh overflow-x-hidden;

    @media (orientation: portrait) {
      @apply overflow-y-hidden;
    }
    // .app__header
    &__header {
    }
    // .app__body
    &__body {
    }
  }

  .container {
    @apply max-w-[1460px] px-[10px];
  }
</style>
