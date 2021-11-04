import { apiAuth as api } from "@/service";

export const namespaced = true;
export const state = () => ({
  token: "",
  userId: "",
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
  SET_USERID(state, userId) {
    state.userId = userId;
  },
  DELETE_TOKEN(state) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    state.token = "";
    state.userId = "";
  },
  DELETE_USERID(state) {
    localStorage.removeItem("userId");
    state.userId = "";
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
      .then(() => {
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
        throw error;
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
        commit("SET_USERID", userId);
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
    commit("DELETE_USERID");
  },

  sendConfirmationCode(_commit, mail) {
    return api
      .sendConfirmationCode(mail)
      .then((response) => {
        console.log(
          "🚀 ~ file: auth.js ~ line 109 ~ .then ~ response",
          response.data
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  verifyCode(_commit, code) {
    return api
      .verifyCode(code)
      .then((response) => {
        console.log(
          "🚀 ~ file: auth.js ~ line 109 ~ .then ~ response",
          response.data
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
