import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
// "https://api-hockey-io.herokuapp.com";
axios.defaults.baseURL = "https://api-hockey-io.herokuapp.com";

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  state: {
    items: {},
    list_arenas: [],
    current_arena: {},
    current_team: {},
    current_contact: {},
    current_service: {},
    currentPL: [],
    team_players: [],
    services: [],
    arenasMapIdentifier: [],
    teams: [],
    trainers: [],
    players: [],
    katokPL: [],
    othersPL: [],
  },
  getters: {
    current_arena(state) {
      return state.current_arena;
    },
    katok_services(state) {
      return state.services.filter((x) => x.serviceType === "ICERINK");
    },
    others_services(state) {
      return state.services.filter((x) => x.serviceType !== "ICERINK");
    },

    children_team(state) {
      return state.teams.filter((x) => x.team.type == "Детскaя");
    },
    youth_team(state) {
      return state.teams.filter((x) => x.team.type == "Юношеская");
    },
    adult_team(state) {
      return state.teams.filter((x) => x.team.type === "Взрослая");
    },
    female_team(state) {
      return state.teams.filter((x) => x.team.type === "Женская");
    },
    kid_trainers(state) {
      return state.trainers.filter((x) => x.qualification === "Детскaя");
    },
    youth_trainers(state) {
      return state.trainers.filter((x) => x.qualification === "Юношеская");
    },
    female_trainer(state) {
      return state.trainers.filter((x) => x.qualification === "Женская");
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
          coords:
            lat && lan ? lat.toString() + ", " + lan.toString() : "55.55,37.32",
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
    SETPRICELIST(state, sPriceList) {
      state.katokPL = sPriceList;
    },
    SET_PRICE_LIST_OTHERS(state, priceList) {
      state.othersPL = priceList;
    },
    SET_CURRENT_PL(state, priceList) {
      state.currentPL = priceList;
    },
    SET_CURRENT_ARENA_TEAM(state, data) {
      const arenas = data.map((item) => item.arena);
      const current_team = { ...state.current_team, arenas: arenas };
      state.current_team = current_team;
      const id = state.teams.findIndex(
        (item) => item.id == state.current_team.id
      );
      if (id > -1) {
        state.teams[id]["arenas"] = arenas;
      }
    },
    SET_TEAM_CONTACT(state, contact) {
      state.current_team["contact"] = contact;
      const id = state.teams.findIndex((item) => item.id == contact.teamId);
      if (id > -1) {
        state.teams[id]["contact"] = contact;
      }
    },
    SET_ARENA_TEAM(state, payload) {
      state.teams = payload;
    },
    SET_ARENA_TRAINER(state, payload) {
      const pos = state.list_arenas.findIndex(
        (item) => (item.id == payload.arena_id)
      );
      if (pos > -1) {
        const arena = state.list_arenas[pos];
        arena["trainers"] = payload.data;
      }
    },
    SET_TEAM_PLAYERS(state, payload) {
      state.team_players = payload;
    }
    // UPDATE_PRICE_LIST(state, service) {
    //   state.katokPL.forEach((x) => {
    //     if (x.id == service[0].serviceId) {
    //       x.price = service;
    //       console.log("SET__");
    //     }
    //   });
    //   state.othersPL.forEach((x) => {
    //     if (x.id === service.serviceId) {
    //       x.price = service.price;
    //     }
    //   });
    // },
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
      console.log("SET_CURRENT_ARENA", item[0]);
      commit("SET_CURRENT_ARENA", item[0]);
    },
    setCurrentArena({ commit }, arena) {
      console.log("ARENA 003", arena);
      commit("SET_CURRENT_ARENA", arena);
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
    getTeamPlayers({ commit }, teamId) {
      axios
        .get(`/team/${teamId}/users`)
        .then((response) => {
          commit("SET_TEAM_PLAYERS", response.data);
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
      return new Promise((resolve) => {
        axios
          .get(`/team/${id}/contact`)
          .then((response) => {
            commit("SET_TEAM_CONTACT", response.data);
            resolve(response.data);
          })
          .catch((err) => console.log(err));
      });
    },
    getTeamUsers({ commit }, id) {
      return new Promise((resolve) => {
        axios
          .get(`/team/${id}/users`)
          .then((response) => {
            console.log(commit);
            resolve(response.data);
          })
          .catch((err) => console.log(err));
      });
    },
    getTeamByID({ commit }, id) {
      const item = this.state.teams.filter((team) => team.id === id);
      console.log(item[0]);
      commit("SET_CURRENT_TEAM", item[0]);
    },
    getServiceById({ commit }, id) {
      const item = this.state.services.filter((service) => service.id === id);
      commit("SET_CURRENT_SERVICE", item[0]);
    },
    getPriceListKatok({ commit }) {
      let priceList = [];
      let katokService = this.state.services.filter((x) => x.serviceType === "ICERINK");
      console.log("KATOKSERVICE", katokService);
      let final = [];
      katokService.forEach((x) => {
        priceList.push(
          new Promise((resolve, reject) => {
            axios
              .get(`/service/${x.id}/price-list`)
              .then((response) => {
                let nItem = {
                  ...x,
                  price: response.data,
                };
                final.push(nItem);
                resolve(response.data);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          })
        );
      });

      Promise.all(priceList).then(() => {
        commit("SETPRICELIST", final);
      });
    },
    getPriceListOthers({ commit }) {
      let priceList = [];
      let otherService = this.state.services.filter((x) => x.type != "Каток");
      let final = [];
      otherService.forEach((x) => {
        priceList.push(
          new Promise((resolve, reject) => {
            axios
              .get(`/service/${x.id}/price-list`)
              .then((response) => {
                let nItem = {
                  ...x,
                  price: response.data,
                };
                final.push(nItem);
                resolve(response.data);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          })
        );
      });

      Promise.all(priceList).then((response) => {
        console.log(response);
        console.log(final);
        commit("SET_PRICE_LIST_OTHERS", final);
      });
    },
    getArenaTeams({ commit }, arena_id) {
      return new Promise((resolve) => {
        axios
          .get(`/arena/${arena_id}/teams`)
          .then((response) => {
            commit("SET_ARENA_TEAM", response.data);
            resolve(response.data);
          })
          .catch((err) => console.log(err));
      });
    },
    getArenaTrainer({ commit }, arena_id) {
      return new Promise((resolve) => {
        axios
          .get(`/arena/${arena_id}/users`)
          .then((response) => {
            commit("SET_ARENA_TRAINER", response.data);
            resolve(response.data);
          })
          .catch((err) => console.log(err));
      });
    },
    setCurrentPL({ commit }, priceList) {
      commit("SET_CURRENT_PL", priceList);
    },

    savePriceList({ commit }, {prices, serviceId}) {
      console.log({prices, serviceId});
      let priceList = [];
      commit("UPDATE_PRICE_LIST");
      prices.forEach((x) => {
        priceList.push(
          new Promise((resolve, reject) => {
            axios
              .post(`/pricelist`, {
                priceId: x.id,
                serviceId: serviceId
              })
              .then((response) => {
                resolve(response.data);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          })
        );
      });

      Promise.all(priceList).then((response) => {
        console.log(response);
        // commit("SET_PRICE_LIST", final);
      });
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
