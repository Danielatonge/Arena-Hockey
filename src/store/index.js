import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {},
  },
  mutations: {
    SET_ITEM(state, items) {
      state.items = items;
    },
  },
  actions: {
    async loadItems({ commit }) {
      const response = await fetch(`/api/arenas`);
      const data = await response.json();
      commit("SET_ITEM", data);
    }
  },
  modules: {},
});
