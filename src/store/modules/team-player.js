import { apiTeamPlayer as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  players: [],
  playerCities: [],
  playerConfig: {},
  teams: [],
  teamConfig: {},
  teamCities: [],
});

export const mutations = {
  SET_PLAYERS(state, players) {
    state.players = players;
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
};

export const actions = {
  getPlayers({ commit }, filters) {
    return api
      .getPlayers(filters)
      .then((response) => {
        const res = response.data;
        commit("SET_PLAYERS", res.content);
        console.log(res.content);
        const config = {
          paginationLength: res.totalPages,
          numFound: res.totalElements,
        };
        commit("SET_PLAYER_CONFIG", config);
        return config;
      })
      .catch((err) => console.log(err));
  },
  getTeams({ commit }, filters) {
    return api
      .getTeams(filters)
      .then((response) => {
        const res = response.data;
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
};

export const getters = {};
