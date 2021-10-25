import { apiTeamPlayer as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  players: [],
  teams: [],
});

export const mutations = {
  SET_PLAYERS(state, players) {
    state.players = players;
  },
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
};

export const actions = {
  getPlayers({ commit }) {
    api
      .getPlayers()
      .then((response) => {
        commit("SET_PLAYERS", response.data);
      })
      .catch((err) => console.log(err));
  },
  getTeams({ commit }) {
    api
      .getTeams()

      .then((response) => {
        commit("SET_TEAMS", response.data);
      })
      .catch((err) => console.log(err));
  },
};

export const getters = {};
