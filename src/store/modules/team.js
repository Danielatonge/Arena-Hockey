import { apiTeam as api } from "@/service";
export const namespaced = true;

export const state = () => ({
  teams: [],
  team: {},
  cities: [],
  forums: [],
  trainers: [],
  players: [],
  users: [],
  arenas: [],
});

export const mutations = {
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
  SET_TEAM(state, team) {
    state.teams = team;
  },
  SET_USERS(state, trainers) {
    state.trainers = trainers;
  },
  SET_TRAINERS(state, trainers) {
    state.trainers = trainers;
  },
  SET_PLAYERS(state, players) {
    state.players = players;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_FORUMS(state, forums) {
    state.forums = forums;
  },
  SET_ARENAS(state, arenas) {
    state.arenas = arenas;
  },
};

export const actions = {
  getTeams({ commit }) {
    api
      .getTeams()
      .then((response) => {
        commit("SET_TEAMS", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTeam({ commit }, teamId) {
    api
      .getTeam(teamId)
      .then((response) => {
        commit("SET_TEAM", response.data);
      })
      .catch((err) => console.log(err));
  },
  setTeam({ commit }, team) {
    commit("SET_TEAM", team);
  },
  getUsers({ commit }, teamId) {
    api
      .getUsers(teamId)
      .then((response) => {
        commit("SET_USERS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getArenas({ commit }, teamId) {
    api
      .getArenas(teamId)
      .then((response) => {
        commit("SET_ARENAS", response.data);
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
  getForums({ commit }, teamId) {
    return api
      .getForums(teamId)
      .then((response) => {
        commit("SET_FORUMS", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },

  postTeam(_context, team) {
    return api
      .postTeam(team)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const getters = {};
