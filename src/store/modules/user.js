import { apiUser as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  user: {},
  arenas: [],
  arena: {},
  teams: [],
  team: {},
  forums: [],
  selected_arenas: [],
  roles: [],
  role: {},
});
export const getters = {
  userId: (state) => {
    state.user.id;
  },
};

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
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_ROLE(state, role) {
    state.role = role;
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
  ADD_ROLE(state, role) {
    state.roles.push(role);
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
  DELETE_ARENA(state, arenaId) {
    state.arenas = state.arenas.filter((x) => x.arena.id !== arenaId);
  },
  DELETE_FORUM(state, forumId) {
    state.forums = state.forums.filter((forum) => forum.id !== forumId);
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
  filterAdminTeams({ commit }, filters) {
    return api
      .filterAdminTeams(filters)
      .then((response) => {
        const res = response.data;
        console.log("🚀 ~ file: arena.js ~ line 183 ~ .then ~ res", res);

        commit("SET_TEAMS", res);
        // return {
        //   paginationLength: res.totalPages,
        //   numFound: res.totalElements,
        // };
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
  getForum(_t, forumId) {
    return api
      .getForum(forumId)
      .then((response) => {
        return response.data;
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
  getUserRoles({ commit }, userId) {
    return api
      .getRoles(userId)
      .then((response) => {
        commit("SET_ROLES", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getRole({ commit }, roleId) {
    return api
      .getRole(roleId)
      .then((response) => {
        commit("SET_ROLE", response.data);
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
      .then((response) => {
        console.log(
          "🚀 ~ file: user.js ~ line 150 ~ .then ~ response",
          response.data
        );

        commit("ADD_FORUM", response.data);
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
    console.log(userObj);
    return api
      .putUser(userObj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  patchRole(_commit, userObj) {
    console.log(userObj);
    return api
      .patchRole(userObj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  getRoleID(_commit, roleName) {
    return api
      .getRoleID(roleName)
      .then((response) => {
        const roleId = response.data.id;
        return roleId;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createRole({ dispatch }, userRole) {
    console.log(
      "🚀 ~ file: user.js ~ line 206 ~ createRole ~ userRole",
      userRole
    );

    return api
      .createUserRole(userRole)
      .then(() => {
        const notification = {
          type: "success",
          message: "Роль пользователя успешно добавлена",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((err) => {
        console.log(err);
        throw err;
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
  deleteArena({ commit }, arenaId) {
    api
      .deleteArena(arenaId)
      .then(() => {
        commit("DELETE_ARENA", arenaId);
      })
      .catch((err) => console.log(err));
  },
  deleteTeam({ commit }, { teamId }) {
    api
      .deleteTeam(teamId)
      .then(() => {
        commit("DELETE_TEAM", teamId);
      })
      .catch((err) => console.log(err));
  },
  deleteForum({ commit }, forumId) {
    api
      .deleteForum(forumId)
      .then(() => {
        commit("DELETE_FORUM", forumId);
      })
      .catch((err) => console.log(err));
  },
};
