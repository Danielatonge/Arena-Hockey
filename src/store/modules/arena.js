import { apiArena as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  arenas: [],
  arena: {},
  teams: [],
  events: [],
  cities: [],
  trainers: [],
  services: [],
  pricelist: [],
  selected_arenas: [],
  selected_events: [],
  paginationLength: 10,
  numFound: 0,
});

export const getters = {
  rentServices(state) {
    return state.services.filter((x) => x.serviceType === "RENT");
  },
  otherServices(state) {
    return state.services.filter((x) => x.serviceType === "OTHER");
  },
  showArenasOnMap(state) {
    return state.arenas.map(({ id, lat, lan, title, city, address }) => ({
      id,
      address,
      coords:
        lat && lan ? lat.toString() + ", " + lan.toString() : "55.55,37.32",
      title,
      city,
    }));
  },
};

export const mutations = {
  SET_ARENAS(state, arenas) {
    state.arenas = arenas;
  },
  SET_ARENA(state, arena) {
    state.arena = arena;
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_SERVICES(state, services) {
    state.services = services;
  },
  SET_TRAINERS(state, trainers) {
    state.trainers = trainers;
  },
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
  SET_SELECTED_ARENAS(state, arenas) {
    state.selected_arenas = arenas;
  },
  SET_SELECTED_EVENTS(state, events) {
    state.selected_events = events;
  },
  ADD_TO_SELECTED_ARENAS(state, arena) {
    state.selected_arenas.push(arena);
  },
  ADD_TO_SELECTED_EVENTS(state, event) {
    state.selected_events.push(event);
  },
  REMOVE_FROM_SELECTED_ARENAS(state, arena) {
    state.selected_arenas = state.selected_arenas.filter(
      (x) => x.id !== arena.id
    );
  },
  REMOVE_FROM_SELECTED_EVENTS(state, index) {
    state.selected_events.splice(index, 1);
  },
  DELETE_SERVICE(state, serviceId) {
    state.services = state.services.filter((x) => x.id !== serviceId);
  },
};

export const actions = {
  getArenas({ commit }, filters) {
    return api
      .getArenas(filters)
      .then((response) => {
        const res = response.data;

        commit("SET_ARENAS", res.content);
        return {
          paginationLength: res.totalPages,
          numFound: res.totalElements,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getServices({ dispatch }, arenaId) {
    dispatch("fetchServices", arenaId).then((services) => {
      dispatch("fetchServicePriceList", services);
    });
  },
  getTrainers({ commit }, arenaId) {
    api
      .getTrainers(arenaId)
      .then((response) => {
        commit("SET_TRAINERS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getTeams({ commit }, arenaId) {
    api
      .getTeams(arenaId)
      .then((response) => {
        commit("SET_TEAMS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getEvents({ commit }, arenaId) {
    return api
      .getEvents(arenaId)
      .then((response) => {
        commit("SET_EVENTS", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
  getCities({ commit }) {
    api
      .getCities()
      .then((response) => {
        commit("SET_CITIES", response.data);
      })
      .catch((err) => console.log(err));
  },
  getEventsFromSelectedArenas({ commit, state }) {
    let eventList = [];
    state.selected_arenas.forEach((x) => {
      eventList.push(
        new Promise((resolve, reject) => {
          api
            .getEvents(x.id)

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
    Promise.all(eventList).then((response) => {
      commit("SET_SELECTED_EVENTS", response);
    });
  },
  getArena({ commit }, arenaId) {
    api
      .getArena(arenaId)
      .then((response) => {
        commit("SET_ARENA", response.data);
      })
      .catch((err) => console.log(err));
  },
  fetchServices(_context, arenaId) {
    return new Promise((resolve, reject) => {
      api
        .getServices(arenaId)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  },
  fetchServicePriceList({ commit }, serviceList) {
    let priceList = [];
    let final = [];
    serviceList.forEach((x) => {
      priceList.push(
        api
          .getPrices(x.id)
          .then((response) => {
            let nItem = {
              ...x,
              price: response.data,
            };
            final.push(nItem);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    });

    Promise.all(priceList).then(() => {
      commit("SET_SERVICES", final);
    });
  },

  setArena({ commit }, arena) {
    commit("SET_ARENA", arena);
  },

  addToSelectedArenas({ commit }, arena) {
    commit("ADD_TO_SELECTED_ARENAS", arena);
  },

  removeFromSelectedArenas({ commit }, arena) {
    commit("REMOVE_FROM_SELECTED_ARENAS", arena);
  },
  removeFromSelectedEvents({ commit }, index) {
    commit("REMOVE_FROM_SELECTED_EVENTS", index);
  },

  deleteService({ commit }, serviceId) {
    api
      .deleteService(serviceId)
      .then(() => {
        commit("DELETE_SERVICE", serviceId);
      })
      .catch((err) => console.log(err));
  },
};
