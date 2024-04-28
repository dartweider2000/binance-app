<script setup lang="ts">
  import NavHeader from "@/components/NavHeader.vue";
  import { useOrderBookStore } from "@/stores/orderBookStore";
  import { useVariablesStore } from "@/stores/variablesStore";
  import { storeToRefs } from "pinia";

  const { getOrderBookSnapshot } = useOrderBookStore();
  const { routeTransitionName } = storeToRefs(useVariablesStore());

  getOrderBookSnapshot();
</script>

<template>
  <div class="app">
    <div class="container">
      <NavHeader ref="headerRef" class="app__header" />
      <div ref="appBodyRef" class="app__body">
        <RouterView #default="{ Component }">
          <Transition :name="routeTransitionName" mode="out-in">
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
      @apply pb-[--app-body-padding-bottom];
    }
  }

  .container {
    @apply max-w-[920px] px-[10px] m-auto w-full;
  }

  .right-enter-from,
  .left-leave-to {
    opacity: 0;
    transform: translate(100px, 0);
  }

  .left-enter-from,
  .right-leave-to {
    opacity: 0;
    transform: translate(-100px, 0);
  }

  .left-enter-active,
  .left-leave-active,
  .right-enter-active,
  .right-leave-active {
    transition: all 0.3s ease 0s;
  }
</style>
