import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Arena/Home.vue";
import Room from "../views/LockerRoom/Room.vue";
import TeamName from "../views/LockerRoom/TeamName.vue";
import ArenaName from "../views/Arena/ArenaName.vue";
import ArenaInformation from "../views/Arena/ArenaInformation.vue";
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
import NameComplex from "../views/Admin/NameComplex.vue";
import ComplexInformation from "../views/Admin/ComplexInformation.vue";
import AdminScheduleEvent from "../views/Admin/AdminScheduleEvent.vue";
import AdminTeamList from "../views/Admin/AdminTeamList.vue";
import AdminTrainStaff from "../views/Admin/AdminTrainStaff.vue";
import AdminManager from "../views/Admin/AdminManager.vue";
import AdminPaymentPortal from "../views/Admin/AdminPaymentPortal.vue";

import EditAdminPaymentPortal from "../views/Admin/Edit/EditAdminPaymentPortal.vue";
import EditNameComplex from "../views/Admin/Edit/EditNameComplex.vue";
import EditComplexInformation from "../views/Admin/Edit/EditComplexInformation.vue";
import EditAdminScheduleEvent from "../views/Admin/Edit/EditAdminScheduleEvent.vue";
import EditAdminTeamList from "../views/Admin/Edit/EditAdminTeamList.vue";
import EditAdminTrainStaff from "../views/Admin/Edit/EditAdminTrainStaff.vue";
import EditAdminManager from "../views/Admin/Edit/EditAdminManager.vue";

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
    path: "/arenaname/:id",
    name: "ArenaName",
    component: ArenaName,
    children: [
      {
        path: "information",
        name: "ArenaInformation",
        component: ArenaInformation,
      },
      {
        path: "payment_portal",
        name: "PaymentPortal",
        component: PaymentPortal,
      },

      {
        path: "list_teams",
        name: "ArenaTeamList",
        component: ArenaTeamList,
      },
      {
        path: "training_staff",
        name: "ArenaTrainingStaff",
        component: ArenaTrainingStaff,
      },
    ],
  },
  {
    path: "/arenaname/:id/event_schedule",
    name: "EventSchedule",
    component: EventSchedule,
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
  {
    path: "/admin/name_complex",
    name: "NameComplex",
    component: NameComplex,
  },
  {
    path: "/admin/name_complex/information",
    name: "ComplexInformation",
    component: ComplexInformation,
  },
  {
    path: "/admin/name_complex/payment_portal",
    name: "AdminPaymentPortal",
    component: AdminPaymentPortal,
  },
  {
    path: "/admin/name_complex/schedule_event",
    name: "AdminScheduleEvent",
    component: AdminScheduleEvent,
  },
  {
    path: "/admin/name_complex/team_list",
    name: "AdminTeamList",
    component: AdminTeamList,
  },
  {
    path: "/admin/name_complex/training_staff",
    name: "AdminTrainStaff",
    component: AdminTrainStaff,
  },
  {
    path: "/admin/name_complex/management_staff",
    name: "AdminManager",
    component: AdminManager,
  },
  {
    path: "/admin/name_complex/edit",
    name: "EditNameComplex",
    component: EditNameComplex,
  },
  {
    path: "/admin/name_complex/information/edit",
    name: "EditComplexInformation",
    component: EditComplexInformation,
  },
  {
    path: "/admin/name_complex/payment_portal/edit",
    name: "EditAdminPaymentPortal",
    component: EditAdminPaymentPortal,
  },
  {
    path: "/admin/name_complex/schedule_event/edit",
    name: "EditAdminScheduleEvent",
    component: EditAdminScheduleEvent,
  },
  {
    path: "/admin/name_complex/team_list/edit",
    name: "EditAdminTeamList",
    component: EditAdminTeamList,
  },
  {
    path: "/admin/name_complex/training_staff/edit",
    name: "EditAdminTrainStaff",
    component: EditAdminTrainStaff,
  },
  {
    path: "/admin/name_complex/management_staff/edit",
    name: "EditAdminManager",
    component: EditAdminManager,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
