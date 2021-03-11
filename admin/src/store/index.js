import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.store";

const authState = createPersistedState({
  paths: ["auth"]
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth
  },
  plugins: [authState]
});

export default store;
