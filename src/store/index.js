import Vue from "vue";
import Vuex from "vuex";
import * as arena from "@/store/modules/arena";
import * as forum from "@/store/modules/forum";
import * as school from "@/store/modules/school";
import * as teamplayer from "@/store/modules/team-player";
import * as team from "@/store/modules/team";
import * as tournament from "@/store/modules/tournament";
import * as user from "@/store/modules/user";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: { arena, forum, school, teamplayer, team, tournament, user },
  plugins: [vuexLocal.plugin],
  state: {
    cartCount: 0,
    userRole: "",
    unAuthtorise: false,
  },
  mutations: {
    SET_CART_COUNT: (state, cartCount) => {
      state.cartCount = cartCount
    },
    SER_USER_ROLE: (state, userRole) => {
      state.userRole = userRole
    },
    SET_UNAUTHTORISE: (state) => {
      state.unAuthtorise = true
    },
  },
  actions: {
    CHANGE_CART_COUNT({commit}, res) {
      commit('SET_CART_COUNT', res);
    },
    CHANGE_USER_ROLE({commit}, res) {
      commit('SER_USER_ROLE', res);
    },
    CHANGE_UNAUTHTORISE({commit}) {
      commit('SET_UNAUTHTORISE');
    },
  },
  getters:{
    CART_COUNT(state){
      return state.cartCount
    },
    USER_ROLE(state){
      return state.userRole
    },
    UNAUTHTORISE(state){
      return state.unAuthtorise
    },
  },
});
