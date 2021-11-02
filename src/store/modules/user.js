import { apiUser as api } from "@/service";

export const namespaced = true;

const userId = "9dbc26d3-c45c-4180-a850-702464fa3f2d";
export const state = () => ({
  userId,
  user: {},
  arenas: [],
  arena: {},
  teams: [],
  team: {},
  forums: [],
  selected_arenas: [],
});

export const mutations = {
  SET_ARENAS(state, arenas) {
    state.arenas = arenas;
  },
  SET_ARENA(state, arena) {
    state.arena = arena;
  },
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
  SET_TEAM(state, team) {
    state.team = team;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_FORUMS(state, forums) {
    state.forums = forums;
  },
  ADD_TO_SELECTED_ARENAS(state, arena) {
    state.selected_arenas.push(arena);
  },
  ADD_FORUM(state, forum) {
    state.forums.push(forum);
  },
  ADD_TEAM(state, team) {
    state.teams.push(team);
  },
  REMOVE_FROM_SELECTED_ARENAS(state, arena) {
    state.selected_arenas = state.selected_arenas.filter(
      (x) => x.id !== arena.id
    );
  },
  EMPTY_SELECTED_ARENAS(state) {
    state.selected_arenas = [];
  },
  DELETE_TEAM(state, teamId) {
    state.teams = state.teams.filter((x) => x.team.id !== teamId);
  },
};

export const actions = {
  getArenas({ commit }, userId) {
    return api
      .getArenas(userId)
      .then((response) => {
        const res = response.data;
        commit("SET_ARENAS", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTeams({ commit }, userId) {
    return api
      .getTeams(userId)
      .then((response) => {
        const res = response.data;
        commit("SET_TEAMS", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTeam({ commit }, teamId) {
    return api
      .getTeam(teamId)
      .then((response) => {
        const res = response.data;
        commit("SET_TEAM", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getUser({ commit }, userId) {
    return api
      .getUser(userId)
      .then((response) => {
        commit("SET_USER", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getForums({ commit }, userId) {
    return api
      .getForums(userId)
      .then((response) => {
        commit("SET_FORUMS", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createUserTeam({ commit }, { userTeamId, team }) {
    return api
      .createUserTeam(userTeamId)
      .then(() => {
        commit("ADD_TEAM", team);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postForum({ commit }, forum) {
    return api
      .postForum(forum)
      .then(() => {
        commit("ADD_FORUM", forum);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  putForum(_commit, forumObj) {
    return api
      .putForum(forumObj)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  },
  putUser(_commit, userObj) {
    return api
      .putUser(userObj)
      .then(() => {})
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
  deleteSelected({ commit, state }) {
    let promiseDeleting = [];
    state.selected_arenas.forEach(({ id }) => {
      promiseDeleting.push(
        api
          .deleteArena(id)
          .then(() => {
            const narenas = state.arenas.filter((x) => x.id !== id);
            commit("SET_ARENAS", narenas);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    });
    Promise.all(promiseDeleting).then(() => {
      commit("EMPTY_SELECTED_ARENAS");
    });
  },
  deleteTeam({ commit }, { teamId }) {
    api
      .deleteTeam(teamId)
      .then(() => {
        commit("DELETE_TEAM", teamId);
      })
      .catch((err) => console.log(err));
  },
};

export const getters = {};
