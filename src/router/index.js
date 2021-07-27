import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Arena/Home.vue";
import Room from "../views/LockerRoom/Room.vue";
import TeamName from "../views/LockerRoom/TeamName.vue";
import ArenaName from "../views/Arena/ArenaName.vue";
import PaymentPortal from "../views/Arena/PaymentPortal.vue";
import ArenaTeamList from "../views/Arena/ArenaTeamList.vue";
import ArenaTrainingStaff from "../views/Arena/ArenaTrainingStaff.vue";
import ArenaPremises from "../views/Arena/ArenaPremises.vue";
import EventScheduleAll from "../views/Arena/EventScheduleAll.vue";
import EventSchedule from "../views/Arena/EventSchedule.vue";
import JoinTeam from "../views/Arena/JoinTeam.vue";
import ArenaMapAll from "../views/Arena/ArenaMapAll.vue";
import BookRoom from "../views/LockerRoom/BookRoom.vue";
import SubstituteBench from "../views/Bench/SubstituteBench.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/arena_maps",
    name: "ArenaMapAll",
    component: ArenaMapAll,
  },
  {
    path: "/event_schedule_all",
    name: "EventScheduleAll",
    component: EventScheduleAll,
  },
  {
    path: "/event_schedule",
    name: "EventSchedule",
    component: EventSchedule,
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
    path: "/list_teams",
    name: "ArenaTeamList",
    component: ArenaTeamList,
  },
  {
    path: "/training_staff",
    name: "ArenaTrainingStaff",
    component: ArenaTrainingStaff,
  },
  {
    path: "/arena_premises",
    name: "ArenaPremises",
    component: ArenaPremises,
  },
  {
    path: "/join_team",
    name: "JoinTeam",
    component: JoinTeam,
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
  {
    path: "/book_room",
    name: "BookRoom",
    component: BookRoom,
  },
  {
    path: "/subs_bench",
    name: "SubstituteBench",
    component: SubstituteBench,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
