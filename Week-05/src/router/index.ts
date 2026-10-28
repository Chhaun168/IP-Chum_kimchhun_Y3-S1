import { createRouter, createWebHistory, type RouterHistory } from "vue-router";
import { getActivePinia } from "pinia";
import EquipmentCatalogPage from "../pages/EquipmentCatalogPage.vue";

export const routes = [
  { path: "/", name: "catalog", component: EquipmentCatalogPage },
  {
    path: "/equipment/:id(\\d+)",
    name: "equipment-detail",
    component: () => import("../pages/EquipmentDetailPage.vue"),
    props: true,
  },
  {
    path: "/my-loans",
    name: "my-loans",
    component: () => import("../pages/MyLoansPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFoundPage.vue"),
  },
];

export function makeRouter(history: RouterHistory = createWebHistory()) {
  const router = createRouter({ history, routes });

  router.beforeEach(() => {
    if (!getActivePinia()) return;
  });

  return router;
}