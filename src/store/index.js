import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "https://api-hockey-io.herokuapp.com";

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
    loadItems({ commit }) {
      axios
        .get(`/arenas`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      // commit("SET_ITEM", data);
    },
  },
  modules: {},
});
