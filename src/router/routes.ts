import type { RouteRecordRaw } from "vue-router";
import { langPath } from "src/i18n/schema";

const routes: RouteRecordRaw[] = [
  {
    path: `/:lang(${langPath})?`,
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
