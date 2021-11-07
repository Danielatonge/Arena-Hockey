import { apiAuth as api } from "@/service";

export const namespaced = true;
export const state = () => ({
  token: "",
  userId: "",
  user: {},
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
  SET_USER(state, user) {
    state.user = user;
  },
  MODIFY_USER(state, updatedUser) {
    state.user = { ...state.user, ...updatedUser };
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
  postUser({ commit, dispatch }, userObj) {
    return api
      .postUser(userObj)
      .then((response) => {
        const data = response.data;
        const userId = data.user.id;
        console.log("🚀 ~ file: auth.js ~ line 49 ~ .then ~ data", data);
        commit("SET_USERID", userId);
        commit("SET_USER", data.user);
        const notification = {
          type: "success",
          message: "Ваша учетная запись была успешно создана",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "При создании учетной записи возникла проблема: " + error.response
              ? error.response.data.message
              : error,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  updateUser({ dispatch }, userObj) {
    return api
      .updateUser(userObj)
      .then((response) => {
        const data = response.data;
        console.log("🚀 ~ file: auth.js ~ line 49 ~ .then ~ data", data);
        const notification = {
          type: "success",
          message: "Ваша учетная запись была успешно изменена",
        };
        dispatch("notification/add", notification, { root: true });
        return data.id;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: error.response.data,
        };
        // "При изменении учетной записи возникла проблема: " + error.response
        //   ? error.response.data.message
        //   : error,
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
          message: "Вы успешно вошли в систему",
        };
        dispatch("notification/add", notification, { root: true });
        return userId;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "При входе в учетную запись возникла проблема: " + error.response
              ? error.response.data.message
              : error,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  logoutUser({ commit }) {
    commit("DELETE_TOKEN");
    commit("DELETE_USERID");
  },

  sendConfirmationCode(_t, mail) {
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
  changePassword({ dispatch }, credentials) {
    return api
      .changePassword(credentials)
      .then((response) => {
        console.log(
          "🚀 ~ file: auth.js ~ line 109 ~ .then ~ response",
          response.data
        );
        const notification = {
          type: "success",
          message: "Пароль успешно изменен",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        console.log(error);
        const notification = {
          type: "Failure",
          message: error.response ? error.response.data.message : error,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  saveUserLocally({ commit }, user) {
    commit("SET_USER", user);
  },
  modifyUserInfo({ commit }, updatedUser) {
    commit("MODIFY_USER", updatedUser);
  },
};
