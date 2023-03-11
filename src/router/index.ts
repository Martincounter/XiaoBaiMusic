import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../components/tabBar.vue"),
      children: [
        {
          path: "search",
          name: "Search",
          component: () => import("../views/searchView.vue"),
        },
        {
          path: "home",
          name: "Home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "playList",
          name: "PlayList",
          component: () => import("../views/playListView.vue"),
        },
        {
          path: "mine",
          name: "Mine",
          component: () => import("../views/mineView.vue"),
        },
        {
          path: "error",
          name: "error",
          component: () => import("../components/errorPage.vue"),
        },
        {
          path: "playListDetails/:id/:type",
          name: "PlayListDetails",
          component: () => import("../views/playListDetails.vue"),
        },
      ],
    },
  ],
});

export default router;
