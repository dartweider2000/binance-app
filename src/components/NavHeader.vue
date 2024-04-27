<script setup lang="ts">
  import MainLogo from "@/components/icons/MainLogo.vue";
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <ul class="header__list">
        <li class="header__item">
          <RouterLink class="header__link" to="/">Preference</RouterLink>
        </li>
        <li class="header__item">
          <MainLogo class="header__main-logo" />
        </li>
        <li class="header__item">
          <RouterLink class="header__link" to="/order-book"
            >Order book</RouterLink
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import "@/assets/scss/variables.scss";
  .header {
    // .header__inner
    &__inner {
      @apply py-[10px];
    }
    // .header__list
    &__list {
      @apply flex gap-[20px] justify-center items-center;
    }
    // .header__item
    &__item {
    }
    // .header__link
    &__link {
      @apply text-[25px] font-medium;

      &_active {
        @apply text-red-600;
      }

      @media (max-width: $mini-mobile-br) {
        @apply text-[18px];
      }
    }
    // .header__main-logo
    &__main-logo {
    }
  }
</style>
