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
  service: {},
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
  SET_SERVICE(state, service) {
    state.service = service;
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
  ADD_ARENA(state, arena) {
    state.arenas.push(arena);
  },
  ADD_TEAM(state, team) {
    state.teams.push(team);
  },
  ADD_TRAINER(state, trainer) {
    state.trainers.push(trainer);
  },
  ADD_SERVICE(state, service) {
    state.services.push(service);
  },
  ADD_EVENT(state, event) {
    state.events.push(event);
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
  DELETE_TEAM(state, { teamId }) {
    state.teams = state.teams.filter((x) => x.team.id !== teamId);
  },
  DELETE_EVENT(state, eventId) {
    state.events = state.events.filter((x) => x.id !== eventId);
  },
  DELETE_TRAINER(state, { trainerId }) {
    state.trainers = state.trainers.filter((x) => x.user.id !== trainerId);
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
  getService({ commit }, serviceId) {
    api
      .getService(serviceId)
      .then((response) => {
        commit("SET_SERVICE", response.data);
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
    return api
      .getTeams(arenaId)
      .then((response) => {
        commit("SET_TEAMS", response.data);
        return response.data;
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
  createArenaTeam({ commit }, { data, team }) {
    api
      .createArenaTeam(data)
      .then((response) => {
        const res = response.data;
        const arenaTeam = {
          id: res.id,
          arenaId: res.arenaId,
          visibility: res.visibility,
          team,
        };
        commit("ADD_TEAM", arenaTeam);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createArenaUser({ commit }, { data, user }) {
    return api
      .createArenaUser(data)
      .then((response) => {
        const res = response.data;
        const arenaUser = {
          id: res.id,
          arenaId: res.arenaId,
          visibility: res.visibility,
          user,
        };
        commit("ADD_TRAINER", arenaUser);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateArenaUser(_context, arenaUserObj) {
    return api
      .putArenaUser(arenaUserObj)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  },
  updateArenaTeam(_context, arenaTeamObj) {
    return api
      .putArenaTeam(arenaTeamObj)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  },
  putArena(_commit, arenaObj) {
    return api
      .putArena(arenaObj)
      .then((response) => {
        const res = response.data;
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  saveArena({ commit }, arena) {
    return api
      .postArena(arena)
      .then((response) => {
        const res = response.data;
        commit("ADD_ARENA", res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  saveService({ commit }, service) {
    return api
      .postService(service)
      .then((response) => {
        const res = response.data;
        commit("ADD_SERVICE", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  saveEvent({ commit }, event) {
    return api
      .postEvent(event)
      .then((response) => {
        const res = response.data;
        commit("ADD_EVENT", res);
      })
      .catch((err) => {
        console.log(err);
      });
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
  deleteTeam({ commit }, arenaTeamId) {
    api
      .deleteTeam(arenaTeamId)
      .then(() => {
        commit("DELETE_TEAM", arenaTeamId);
      })
      .catch((err) => console.log(err));
  },
  deleteEvent({ commit }, eventId) {
    api
      .deleteEvent(eventId)
      .then(() => {
        commit("DELETE_EVENT", eventId);
      })
      .catch((err) => console.log(err));
  },
  deleteTrainer({ commit }, arenaTrainerId) {
    return api
      .deleteTrainer(arenaTrainerId)
      .then(() => {
        commit("DELETE_TRAINER", arenaTrainerId);
      })
      .catch((err) => console.log(err));
  },
};
