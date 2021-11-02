import { apiAuth as api } from "@/service";

export const namespaced = true;
export const state = () => ({
  token: "",
  arena: {},
  teams: [],
  team: {},
  forums: [],
});
export const getters = {
  loggedIn: (state) => !!state.token,
};
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  DELETE_TOKEN(state) {
    localStorage.removeItem("token");
    state.token = "";
  },
};

export const actions = {
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
  postUser({ dispatch }, userObj) {
    return api
      .postUser(userObj)
      .then((response) => {
        console.log(
          "🚀 ~ file: auth.js ~ line 33 ~ .then ~ response",
          response
        );
        const notification = {
          type: "success",
          message: "Your account was created Successfully",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "There was a problem Creating your account: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  loginUser({ commit, dispatch }, credential) {
    return api
      .login(credential)
      .then((response) => {
        console.log(
          "🚀 ~ file: auth.js ~ line 56 ~ .then ~ response",
          response
        );
        const { jwt, userId } = response.data;
        commit("SET_TOKEN", jwt);

        const notification = {
          type: "success",
          message: "You Successfully Logged In",
        };
        dispatch("notification/add", notification, { root: true });
        return userId;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "There was a problem Logging you into your account: " +
            error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  logoutUser({ commit }) {
    commit("DELETE_TOKEN");
  },
  putUser(_commit, userObj) {
    return api
      .putUser(userObj)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  },
};
