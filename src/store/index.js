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
});
