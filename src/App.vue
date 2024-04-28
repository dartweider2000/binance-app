<script setup lang="ts">
  import NavHeader from "@/components/NavHeader.vue";
</script>

<template>
  <div class="app">
    <div class="container">
      <NavHeader ref="headerRef" class="app__header" />
      <div ref="appBodyRef" class="app__body">
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
    @apply h-dvh;
    // .app__header
    &__header {
    }
    // .app__body
    &__body {
      // @apply pb-[10px];
    }
  }

  .container {
    @apply max-w-[920px] px-[10px] m-auto w-full;
  }
</style>
