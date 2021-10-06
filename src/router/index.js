import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Home/Home.vue";
import Arena from "../views/Arena/Arena.vue";
import Room from "../views/LockerRoom/Room.vue";
import SportSchools from "../views/Schools/SportSchools.vue";
import TeamName from "../views/LockerRoom/TeamName.vue";
import ArenaName from "../views/Arena/ArenaName.vue";
import ArenaInformation from "../views/Arena/ArenaInformation.vue";
import PaymentPortal from "../views/Arena/PaymentPortal.vue";
import ArenaTeamList from "../views/Arena/ArenaTeamList.vue";
import ArenaTrainingStaff from "../views/Arena/ArenaTrainingStaff.vue";
import ArenaPremises from "../views/Arena/ArenaPremises.vue";
import EventScheduleAll from "../views/Arena/EventScheduleAll.vue";
import EventSchedule from "../views/Arena/EventSchedule.vue";
import ArenaLeadership from "../views/Arena/ArenaLeadership.vue";
import KatokScheduleBook from "../views/Arena/KatokScheduleBook.vue";

import JoinTeam from "../views/Arena/JoinTeam.vue";
import ArenaMapAll from "../views/Arena/ArenaMapAll.vue";
import BookRoom from "../views/LockerRoom/BookRoom.vue";
import SubstituteBench from "../views/Bench/SubstituteBench.vue";

import AdminSportComplex from "../views/Admin/Arena/AdminSportComplex.vue";
import AdminAddArenaSportComplex from "../views/Admin/Arena/AdminAddArenaSportComplex.vue";

import NameComplex from "../views/Admin/Arena/View/NameComplex.vue";
import ComplexInformation from "../views/Admin/Arena/View/ComplexInformation.vue";
import AdminScheduleEvent from "../views/Admin/Arena/View/AdminScheduleEvent.vue";
import AdminTeamList from "../views/Admin/Arena/View/AdminTeamList.vue";
import AdminTrainStaff from "../views/Admin/Arena/View/AdminTrainStaff.vue";
import AdminManager from "../views/Admin/Arena/View/AdminManager.vue";
import AdminPaymentPortal from "../views/Admin/Arena/View/AdminPaymentPortal.vue";

import EditAdminPaymentPortal from "../views/Admin/Arena/Edit/EditAdminPaymentPortal.vue";
import EditNameComplex from "../views/Admin/Arena/Edit/EditNameComplex.vue";
import EditComplexInformation from "../views/Admin/Arena/Edit/EditComplexInformation.vue";
import EditAdminScheduleEvent from "../views/Admin/Arena/Edit/EditAdminScheduleEvent.vue";
import EditAdminTeamList from "../views/Admin/Arena/Edit/EditAdminTeamList.vue";
import EditAdminTrainStaff from "../views/Admin/Arena/Edit/EditAdminTrainStaff.vue";
import EditAdminManager from "../views/Admin/Arena/Edit/EditAdminManager.vue";
import EditAdminPriceList from "../views/Admin/Arena/Edit/EditAdminPriceList.vue";

import CreateAdminPaymentPortal from "../views/Admin/Arena/Create/CreateAdminPaymentPortal.vue";
import CreateComplexInformation from "../views/Admin/Arena/Create/CreateComplexInformation.vue";
import CreateAdminScheduleEvent from "../views/Admin/Arena/Create/CreateAdminScheduleEvent.vue";
import CreateAdminTeamList from "../views/Admin/Arena/Create/CreateAdminTeamList.vue";
import CreateAdminTrainStaff from "../views/Admin/Arena/Create/CreateAdminTrainStaff.vue";
import CreateAdminManager from "../views/Admin/Arena/Create/CreateAdminManager.vue";
import KidsTournaments from "../views/KidsTournaments/Home.vue";
import AdminLayoutSection from "../views/Admin/AdminLayoutSection";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/arena",
    name: "Arena",
    component: Arena,
  },
  {
    path: "/kids_tournement",
    name: "KidsTournaments",
    component: KidsTournaments,
  },
  {
    path: "/arena/arena_maps",
    name: "ArenaMapAll",
    component: ArenaMapAll,
  },
  {
    path: "/event_schedule_all",
    name: "EventScheduleAll",
    component: EventScheduleAll,
  },
  {
    path: "/arena/:id/",
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
      {
        path: "event_schedule",
        name: "EventSchedule",
        component: EventSchedule,
      },
      {
        path: "leadership",
        name: "ArenaLeadership",
        component: ArenaLeadership,
      },
    ],
  },
  {
    path: "/arena/:arenaId/event_schedule/:serviceId",
    name: "KatokScheduleBook",
    component: KatokScheduleBook,
  },
  {
    path: "/arena/:arenaId/service/:serviceId",
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
    path: "/school",
    name: "SportSchools",
    component: SportSchools,
  },
  {
    path: "/teamname/:teamId",
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
    path: "/admin",
    name: "AdminLayoutSection",
    component: AdminLayoutSection,
    children: [
      {
        path: "/admin/sport_complex/add",
        name: "AdminAddArenaSportComplex",
        component: AdminAddArenaSportComplex,
      },
    ],
  },
  {
    path: "/admin/sport_complex",
    name: "AdminSportComplex",
    component: AdminSportComplex,
  },

  {
    path: "/admin/sport_complex/:id",
    component: NameComplex,
    children: [
      {
        path: "",
        name: "ComplexInformation",
        component: ComplexInformation,
      },
      {
        path: "payment_portal",
        name: "AdminPaymentPortal",
        component: AdminPaymentPortal,
      },
      {
        path: "schedule_event",
        name: "AdminScheduleEvent",
        component: AdminScheduleEvent,
      },
      {
        path: "team_list",
        name: "AdminTeamList",
        component: AdminTeamList,
      },
      {
        path: "training_staff",
        name: "AdminTrainStaff",
        component: AdminTrainStaff,
      },
      {
        path: "management_staff",
        name: "AdminManager",
        component: AdminManager,
      },
    ],
  },
  {
    path: "/admin/sport_complex/:id/edit",
    name: "EditNameComplex",
    component: EditNameComplex,
  },
  {
    path: "/admin/sport_complex/:id/information/edit",
    name: "EditComplexInformation",
    component: EditComplexInformation,
  },
  {
    path: "/admin/sport_complex/:id/payment_portal/edit",
    name: "EditAdminPaymentPortal",
    component: EditAdminPaymentPortal,
  },
  {
    path: "/admin/sport_complex/:id/schedule_event/edit",
    name: "EditAdminScheduleEvent",
    component: EditAdminScheduleEvent,
  },
  {
    path: "/admin/sport_complex/:id/team_list/edit",
    name: "EditAdminTeamList",
    component: EditAdminTeamList,
  },
  {
    path: "/admin/sport_complex/:id/training_staff/edit",
    name: "EditAdminTrainStaff",
    component: EditAdminTrainStaff,
  },
  {
    path: "/admin/sport_complex/:id/management_staff/edit",
    name: "EditAdminManager",
    component: EditAdminManager,
  },
  {
    path: "/admin/sport_complex/information/create",
    name: "CreateComplexInformation",
    component: CreateComplexInformation,
  },
  {
    path: "/admin/sport_complex/payment_portal/create",
    name: "CreateAdminPaymentPortal",
    component: CreateAdminPaymentPortal,
  },
  {
    path: "/admin/sport_complex/schedule_event/create",
    name: "CreateAdminScheduleEvent",
    component: CreateAdminScheduleEvent,
  },
  {
    path: "/admin/sport_complex/team_list/create",
    name: "CreateAdminTeamList",
    component: CreateAdminTeamList,
  },
  {
    path: "/admin/sport_complex/training_staff/create",
    name: "CreateAdminTrainStaff",
    component: CreateAdminTrainStaff,
  },
  {
    path: "/admin/sport_complex/management_staff/create",
    name: "CreateAdminManager",
    component: CreateAdminManager,
  },
  {
    path: "/admin/sport_complex/:arenaId/payment_portal/price_list/:serviceId",
    name: "EditAdminPriceList",
    component: EditAdminPriceList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
