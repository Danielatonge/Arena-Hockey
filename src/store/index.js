import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
axios.defaults.baseURL = "https://api-hockey-io.herokuapp.com";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    items: {},
    list_arenas: [],
    current_arena: {},
  },
  mutations: {
    SET_ARENAS(state, arenas) {
      state.list_arenas = arenas;
    },
    SET_CURRENT_ARENA(state, arena) {
      state.current_arena = arena;
    },
  },
  actions: {
    getAllArenas({ commit }) {
      axios
        .get(`/arenas`)
        .then((response) => {
          commit("SET_ARENAS", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArenaGivenID({ commit }, payload) {
      const item = this.state.list_arenas.filter(
        (arena) => arena.id === payload
      );
      console.log(item[0]);
      commit("SET_CURRENT_ARENA", item[0]);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
