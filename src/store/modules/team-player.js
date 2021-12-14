import { apiTeamPlayer as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  trainers: [],
  players: [],
  playerCities: [],
  playerConfig: {},
  teams: [],
  teamConfig: {},
  teamCities: [],
  playerInfo: [],
});

export const mutations = {
  SET_PLAYERS(state, players) {
    state.players = players;
  },
  SET_TRAINERS(state, trainers) {
    state.trainers = trainers;
  },
  SET_PLAYER_CONFIG(state, playerConfig) {
    state.playerConfig = playerConfig;
  },
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
  SET_TEAM_CITIES(state, cities) {
    state.teamCities = cities;
  },
  SET_PLAYER_CITIES(state, cities) {
    state.playerCities = cities;
  },
  SET_TEAM_CONFIG(state, teamConfig) {
    state.teamConfig = teamConfig;
  },
  SET_PLAYER_INFORMATION(state, playerInfo) {
    state.playerInfo = playerInfo;
  },
};

export const actions = {
  filterPlayers({ commit }, filters) {
    return api
      .filterPlayers(filters)
      .then((response) => {
        const res = response.data;
        commit("SET_PLAYERS", res.content);
        console.log(res);
        const config = {
          paginationLength: res.totalPages,
          numFound: res.totalElements,
        };
        return config;
      })
      .catch((err) => console.log(err));
  },
  filterTeams({ commit }, filters) {
    return api
      .filterTeams(filters)
      .then((response) => {
        const res = response.data;
        console.log("🚀 ~ file: team-player.js ~ line 56 ~ .then ~ res", res);
        commit("SET_TEAMS", res.content);
        const config = {
          paginationLength: res.totalPages,
          numFound: res.totalElements,
        };
        commit("SET_TEAM_CONFIG", config);
        return config;
      })
      .catch((err) => console.log(err));
  },
  getTeams({ commit }) {
    return api
      .getTeams()
      .then((response) => {
        commit("SET_TEAMS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getPlayers({ commit }) {
    return api
      .getPlayers()
      .then((response) => {
        commit("SET_PLAYERS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getTrainers({ commit }) {
    return api
      .getTrainers()
      .then((response) => {
        commit("SET_TRAINERS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getTeamCities({ commit }) {
    return api
      .getTeamCities()
      .then((response) => {
        commit("SET_TEAM_CITIES", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
  getPlayerCities({ commit }) {
    return api
      .getPlayerCities()
      .then((response) => {
        commit("SET_PLAYER_CITIES", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
  getPlayerInformation({ commit }, id) {
    return api
      .getPlayerInformation(id)
      .then((response) => {
        commit("SET_PLAYER_INFORMATION", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
};

export const getters = {};
