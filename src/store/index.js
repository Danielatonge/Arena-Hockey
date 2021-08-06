import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
// "https://api-hockey-io.herokuapp.com";
axios.defaults.baseURL = "https://api-hockey-io.herokuapp.com";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    items: {},
    list_arenas: [],
    current_arena: {},
    current_contact: {},
    services: [],
    arenasMapIdentifier: [],
    teams: [],
  },
  getters: {
    current_arena(state) {
      return state.current_arena;
    },
    icon_contacts(state) {
      const { whatsApp, website, vk, instagram } = state.current_contact;
      return { whatsApp, website, vk, instagram };
    },
    katok_services(state) {
      return state.services.filter((x) => x.type == "Каток");
    },
    others_services(state) {
      return state.services.filter((x) => x.type != "Каток");
    },
    children_team(state) {
      return state.teams.filter((x) => x.level == "Детские");
    },
    youth_team(state) {
      return state.teams.filter((x) => x.level == "Юношеские");
    },
    adult_team(state) {
      return state.teams.filter((x) => x.level == "Взрослые");
    },
  },
  mutations: {
    SET_ARENAS(state, arenas) {
      state.list_arenas = arenas;
    },
    SET_MAP_COORDINATES(state) {
      state.arenasMapIdentifier = state.list_arenas.map(
        ({ id, lat, lan, title, city, address }) => ({
          id,
          address,
          coords: lat && lan ? lat.toString() + ", " + lan.toString(): "55.55,37.32",
          title,
          city,
        })
      );
    },
    SET_MAP_COORDINATE(state, source) {
      console.log(source);
      state.arenasMapIdentifier = source.map(
        ({ id, lat, lan, title, city, address }) => ({
          id,
          address,
          coords: lat.toString() + ", " + lan.toString(),
          title,
          city,
        })
      );
    },
    SET_CURRENT_ARENA(state, arena) {
      state.current_arena = arena;
    },
    SET_CURRENT_CONTACT(state, contact) {
      state.current_contact = contact;
    },
    SET_SERVICES(state, services) {
      state.services = services;
    },
    SET_TEAMS(state, teams) {
      state.teams = teams;
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
    setCurrentArena({commit}, arena) {
      commit("SET_CURRENT_ARENA", arena);
    },
    getContactById({ commit }, payload) {
      return new Promise((resolve) => {
        axios
          .get(`/contact/arena/${payload}`)
          .then((response) => {
            commit("SET_CURRENT_CONTACT", response.data);
            resolve(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    displayMapAll({ commit }) {
      commit("SET_MAP_COORDINATES");
    },
    displayMapOne({ commit }, payload) {
      commit("SET_MAP_COORDINATE", payload);
    },
    getServicesAll({ commit }) {
      axios
        .get(`/services`)
        .then((response) => {
          commit("SET_SERVICES", response.data);
        })
        .catch((err) => console.log(err));
    },
    getTeamsAll({ commit }) {
      axios
        .get(`/teams`)
        .then((response) => {
          commit("SET_TEAMS", response.data);
        })
        .catch((err) => console.log(err));
    },

  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
