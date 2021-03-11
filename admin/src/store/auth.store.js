import authService from "../services/auth.service";
export default {
  namespaced: true,
  state: {
    accessToken: null,
    userId: null
  },
  mutations: {
    LOGIN_SUCCESS(state, payload) {
      const { accessToken, userId } = payload;
      state.accessToken = accessToken;
      state.userId = userId;
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userId = null;
    }
  },
  actions: {
    async loginAsync({ commit }, payload) {
      const res = await authService.login(payload);
      const { id: accessToken, userId } = res;
      commit("LOGIN_SUCCESS", { accessToken, userId });
    },
    async logoutAsync({ commit }) {
      commit("LOGOUT");
    }
  }
};
