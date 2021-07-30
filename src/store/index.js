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
  },
  mutations: {
    SET_ARENAS(state, arenas) {
      state.list_arenas = arenas;
    },
  },
  actions: {
    getAllArenas({ commit }) {
      axios
        .get(`/arenas`)
        .then((response) => {
          commit("SET_ARENAS", response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getArenaGivenID({ commit }, payload) {
    //   axios.get('/')
    // }
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
