import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/machines/:id",
    name: "Machine",

    component: () =>
      import(/* webpackChunkName: "machine" */ "../pages/MachinePage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
