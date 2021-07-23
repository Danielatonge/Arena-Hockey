import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Room from "../views/Room.vue";
import TeamName from "../views/TeamName.vue";
import ArenaName from "../views/ArenaName.vue";
import PaymentPortal from "../views/PaymentPortal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/arenaname",
    name: "ArenaName",
    component: ArenaName,
  },
  {
    path: "/payment_portal",
    name: "PaymentPortal",
    component: PaymentPortal,
  },
  {
    path: "/room",
    name: "Room",
    component: Room,
  },
  {
    path: "/teamname",
    name: "TeamName",
    component: TeamName,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
