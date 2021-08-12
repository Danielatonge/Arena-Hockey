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
    current_team: {},
    current_contact: {},
    current_service: {},
    services: [],
    arenasMapIdentifier: [],
    teams: [],
    trainers: [],
    players: [],
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
      return state.teams.filter((x) => x.type == "Детскaя");
    },
    youth_team(state) {
      return state.teams.filter((x) => x.type == "Юношеская");
    },
    adult_team(state) {
      return state.teams.filter((x) => x.type === "Взрослая");
    },
    female_team(state) {
      return state.teams.filter((x) => x.type === "Женская");
    },
    kid_trainers(state) {
      return state.trainers.filter((x) => x.qualification === "Детскaя");
    },
    youth_trainers(state) {
      return state.trainers.filter((x) => x.qualification === "Юношеская");
    }
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
          coords: lat && lan ? lat.toString() + ", " + lan.toString() : "55.55,37.32",
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
    SET_CURRENT_TEAM(state, team) {
      state.current_team = team;
    },
    SET_CURRENT_SERVICE(state, service) {
      state.current_service = service;
    },
    SET_SERVICES(state, services) {
      state.services = services;
    },
    SET_TEAMS(state, teams) {
      state.teams = teams;
    },
    SET_TRAINERS(state, trainers) {
      state.trainers = trainers;
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    SET_CURRENT_ARENA_TEAM(state, data) {
      const arenas = data.map((item) => item.arena)
      const current_team = { ...state.current_team, arenas: arenas };
      state.current_team = current_team
      const id = state.teams.findIndex(item => item.id == state.current_team.id)
      if (id > -1) {
        state.teams[id]["arenas"] = arenas;
      }
    },
    SET_TEAM_CONTACT(state, contact) {
      state.current_team["contact"] = contact
      const id = state.teams.findIndex(item => item.id == contact.teamId)
      if (id > -1) {
        state.teams[id]["contact"] = contact;
      }
    }
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
    setCurrentArena({ commit }, arena) {
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
    getAllTeams({ commit }) {
      axios
        .get(`/teams`)
        .then((response) => {
          commit("SET_TEAMS", response.data);
        })
        .catch((err) => console.log(err));
    },
    getAllTrainers({ commit }) {
      axios
        .get(`/user?role=TRAINER`)
        .then((response) => {
          commit("SET_TRAINERS", response.data);
        })
        .catch((err) => console.log(err));
    },
    getAllPlayers({ commit }) {
      axios
        .get(`/user?role=PLAYER`)
        .then((response) => {
          commit("SET_PLAYERS", response.data);
        })
        .catch((err) => console.log(err));
    },
    getCurrentTeamArenas({ commit }, id) {
      axios
        .get(`/team/${id}/arenas`)
        .then((response) => {
          console.log("SET_CURRENT_ARENA_TEAM", response.data);
          commit("SET_CURRENT_ARENA_TEAM", response.data);
        })
        .catch((err) => console.log(err));
    },
    getTeamContacts({ commit }, id) {
      axios
        .get(`/team/${id}/contact`)
        .then((response) => {
          console.log("SET_TEAM_CONTACT", response.data);
          commit("SET_TEAM_CONTACT", response.data);
        })
        .catch((err) => console.log(err));
    },
    getTeamByID({ commit }, id) {
      const item = this.state.teams.filter(
        (team) => team.id === id
      );
      console.log(item[0]);
      commit("SET_CURRENT_TEAM", item[0]);
    },
    getServiceById({ commit }, id) {
      const item = this.state.services.filter(
        (service) => service.id === id
      );
      commit("SET_CURRENT_SERVICE", item[0]);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
