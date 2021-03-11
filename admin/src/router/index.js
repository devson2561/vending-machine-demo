import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import MainLayout from "../layouts/MainLayout.vue";

import HomePage from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      authRequired: true
    },
    component: MainLayout,
    children: [
      {
        path: "/",
        redirect: "/vending-machines"
      },
      {
        path: "/products",
        name: "Products",
        component: () =>
          import(
            /* webpackChunkName: "product" */ "../pages/product/ProductsPage.vue"
          )
      },
      {
        path: "/vending-machines",
        name: "Machines",
        component: () =>
          import(
            /* webpackChunkName: "machine" */ "../pages/machine/MachinesPage.vue"
          )
      },
      {
        path: "/vending-machines/:id",
        name: "Machine",
        component: () =>
          import(
            /* webpackChunkName: "machine" */ "../pages/machine/MachinePage.vue"
          )
      }
    ]
  },
  {
    path: "/auth",

    component: () =>
      import(/* webpackChunkName: "auth" */ "../layouts/AuthLayout.vue"),
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "auth" */ "../pages/auth/LoginPage.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to && to.matched.some((record) => record.meta.authRequired)) {
    const { accessToken } = store.state.auth;
    console.log(accessToken, "accessToken..");
    if (!accessToken) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
