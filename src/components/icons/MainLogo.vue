<script setup lang="ts"></script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 24 24"
  >
    <path
      id="up-vue"
      d="m12 12.765 5.592-9.437h-3.276L12 7.33v.002L9.688 3.328h-3.28z"
      fill="var(--vue-up-fill)"
    ></path>
    <path
      id="down-vue"
      d="M18.461 3.332 12 14.235 5.539 3.332H1.992L12 20.672l10.008-17.34z"
      fill="var(--vue-down-fill)"
    ></path>
  </svg>
</template>

<style scoped lang="scss">
  @import "@/assets/scss/variables.scss";
  svg {
    @media (max-width: $mini-mobile-br) {
      @apply w-[60px] h-[60px];
    }
  }
</style>
