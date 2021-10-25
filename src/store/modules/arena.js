import { apiArena as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  arenas: [],
  arena: {},
  maps: [],
  map: {},
  teams: [],
  events: [],
  cities: [],
  trainers: [],
  services: [],
  pricelist: [],
  selected_arenas: [],
  selected_events: [],
});

export const getters = {
  arena(state) {
    return state.arena;
  },
  rentServices(state) {
    return state.services.filter((x) => x.serviceType === "RENT");
  },
  otherServices(state) {
    return state.services.filter((x) => x.serviceType !== "RENT");
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
  SET_MAPS(state, arenas) {
    state.maps = arenas.map(({ id, lat, lan, title, city, address }) => ({
      id,
      address,
      coords:
        lat && lan ? lat.toString() + ", " + lan.toString() : "55.55,37.32",
      title,
      city,
    }));
  },
  SET_MAP(state, arena) {
    const { id, lat, lan, title, city, address } = arena;
    const coords =
      lat && lan ? lat.toString() + ", " + lan.toString() : "55.55,37.32";
    state.map = { id, address, coords, title, city };
  },
};

export const actions = {
  getArenas({ commit }) {
    api
      .getArenas()
      .then((response) => {
        commit("SET_ARENAS", response.data);
      })
      .catch((err) => {
        console.log(err);
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
  setArena({ commit }, arena) {
    commit("SET_ARENA", arena);
  },
  showArenaOnMap({ commit }, arena) {
    commit("SET_MAP", arena);
  },
  showArenasOnMap({ commit }, arenas) {
    commit("SET_MAPS", arenas);
  },
  getServices({ commit }, arenaId) {
    api
      .getServices(arenaId)
      .then((response) => {
        commit("SET_SERVICES", response.data);
      })
      .catch((err) => console.log(err));
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
    return api
      .getCities()
      .then((response) => {
        commit("SET_CITIES", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
};
