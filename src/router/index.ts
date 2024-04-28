import { useVariablesStore } from "@/stores/variablesStore";
import { storeToRefs } from "pinia";
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

router.beforeEach((to, from, next) => {
  const { routeTransitionName } = storeToRefs(useVariablesStore());
  const getLastPathAtUrl = (path: string) => path.split("/").pop() || "/";

  const toRoute = getLastPathAtUrl(to.path);
  const fromRoute = getLastPathAtUrl(from.path);

  if (["/", "preference"].includes(fromRoute) && toRoute == "order-book") {
    routeTransitionName.value = "right";
  } else if (
    ["/", "preference"].includes(toRoute) &&
    fromRoute == "order-book"
  ) {
    routeTransitionName.value = "left";
  }

  next();
});
