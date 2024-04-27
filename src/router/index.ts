import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/preference",
      component: () => import("../views/PreferenceView.vue"),
    },
    {
      path: "/order-book",
      component: () => import("../views/OrderBookView.vue"),
    },
  ],
  linkActiveClass: "header__link_active",
});
