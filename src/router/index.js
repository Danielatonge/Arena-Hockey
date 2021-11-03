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

import AdminAddArenaSportComplex from "../views/Admin/Arena/AdminAddArenaSportComplex.vue";
import AdminTeam from "../views/Admin/Team/AdminTeam";

import NameComplex from "../views/Admin/Arena/View/NameComplex.vue";
import ComplexInformation from "../views/Admin/Arena/View/ComplexInformation.vue";
import AdminScheduleEvent from "../views/Admin/Arena/View/AdminScheduleEvent.vue";
import AdminTeamList from "../views/Admin/Arena/View/AdminTeamList.vue";
import AdminTrainStaff from "../views/Admin/Arena/View/AdminTrainStaff.vue";
import AdminPaymentPortal from "../views/Admin/Arena/View/AdminPaymentPortal.vue";

import EditAdminPaymentPortal from "../views/Admin/Arena/Edit/EditAdminPaymentPortal.vue";
import EditNameComplex from "../views/Admin/Arena/Edit/EditNameComplex.vue";
import EditComplexInformation from "../views/Admin/Arena/Edit/EditComplexInformation.vue";
import EditAdminScheduleEvent from "../views/Admin/Arena/Edit/EditAdminScheduleEvent.vue";
import EditAdminTeamList from "../views/Admin/Arena/Edit/EditAdminTeamList.vue";
import EditAdminTrainStaff from "../views/Admin/Arena/Edit/EditAdminTrainStaff.vue";
import EditAdminPriceList from "../views/Admin/Arena/Edit/EditAdminPriceList.vue";

import CreateComplexInformation from "../views/Admin/Arena/Create/CreateComplexInformation.vue";
import CreateAdminTeam from "../views/Admin/Team/Create/CreateAdminTeam.vue";
import EditAdminTeam from "../views/Admin/Team/Edit/EditAdminTeam.vue";
import AdminTeamView from "../views/Admin/Team/View/AdminTeamView.vue";

import KidsTournaments from "../views/KidsTournaments/Home.vue";
import AdminLayoutSection from "../views/Admin/AdminLayoutSection";
import UserProfile from "../views/Admin/User/UserProfile";
import CreateArenaEvent from "../views/Admin/Arena/Create/CreateArenaEvent";
import EditAdminService from "../views/Admin/Arena/Edit/EditAdminService";
import CreateAdminService from "../views/Admin/Arena/Create/CreateAdminService";

import UserInformation from "../views/Admin/User/View/UserInformation.vue";
import EditUserInformation from "../views/Admin/User/Edit/EditUserInformation.vue";

import Login from "../views/Admin/Auth/Login.vue";
import Registration from "../views/Admin/Auth/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/arena",
    name: "arena",
    component: Arena,
  },
  {
    path: "/kids_tournement",
    name: "kidsTournaments",
    component: KidsTournaments,
  },
  {
    path: "/arena/arena_maps",
    name: "arena-map-all",
    component: ArenaMapAll,
  },
  {
    path: "/event_schedule_all",
    name: "event-schedule-all",
    component: EventScheduleAll,
  },
  {
    path: "/arena/:arenaId",
    component: ArenaName,
    props: true,
    children: [
      {
        path: "",
        name: "arena-information",
        component: ArenaInformation,
        props: true,
      },
      {
        path: "payment_portal",
        name: "payment-portal",
        component: PaymentPortal,
        props: true,
      },

      {
        path: "list_teams",
        name: "arena-team-list",
        component: ArenaTeamList,
        props: true,
      },
      {
        path: "training_staff",
        name: "arena-training-staff",
        component: ArenaTrainingStaff,
        props: true,
      },
      {
        path: "event_schedule",
        name: "event-schedule",
        component: EventSchedule,
        props: true,
      },
      {
        path: "leadership",
        name: "arena-leadership",
        component: ArenaLeadership,
      },
    ],
  },
  {
    path: "/arena/:arenaId/event_schedule/:serviceId",
    name: "katok-schedule-book",
    component: KatokScheduleBook,
    props: true,
  },
  {
    path: "/arena/:arenaId/service/:serviceId",
    name: "arena-premises",
    component: ArenaPremises,
    props: true,
  },
  {
    path: "/join_team",
    name: "join-team",
    component: JoinTeam,
  },
  {
    path: "/room",
    name: "room",
    component: Room,
  },
  {
    path: "/school",
    name: "sport-schools",
    component: SportSchools,
  },
  {
    path: "/teamname/:teamId",
    name: "team-name",
    component: TeamName,
    props: true,
  },
  {
    path: "/book_room",
    name: "book-room",
    component: BookRoom,
  },
  {
    path: "/subs_bench",
    name: "substitute-bench",
    component: SubstituteBench,
  },
  {
    path: "/admin/:userId",
    component: AdminLayoutSection,
    props: true,
    children: [
      {
        path: "",
        name: "user-profile",
        component: UserProfile,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "sport_complex",
        name: "admin-add-arena-sportcomplex",
        component: AdminAddArenaSportComplex,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "teams",
        name: "admin-team",
        component: AdminTeam,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "sport_complex/create",
        name: "create-complex-information",
        component: CreateComplexInformation,
        meta: { requiresAuth: true },
        props: true,
      },
    ],
  },

  {
    path: "/admin/:userId/sport_complex/:arenaId",
    component: NameComplex,
    props: true,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "complex-information",
        component: ComplexInformation,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "payment_portal",
        name: "admin-payment-portal",
        component: AdminPaymentPortal,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "schedule_event",
        name: "admin-schedule-event",
        component: AdminScheduleEvent,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "team_list",
        name: "admin-team-list",
        component: AdminTeamList,
        props: true,
      },
      {
        path: "training_staff",
        name: "admin-train-staff",
        component: AdminTrainStaff,
        props: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/admin/:userId/sport_complex/:arenaId/edit",
    component: EditNameComplex,
    props: true,
    children: [
      {
        path: "",
        name: "edit-complex-information",
        component: EditComplexInformation,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "payment_portal",
        name: "edit-admin-payment-portal",
        component: EditAdminPaymentPortal,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "payment_portal/create_service",
        name: "create-admin-service",
        component: CreateAdminService,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "payment_portal/price_list/:serviceId",
        name: "edit-admin-pricelist",
        component: EditAdminPriceList,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "payment_portal/:serviceId",
        name: "edit-admin-service",
        component: EditAdminService,
        props: true,
        meta: { requiresAuth: true },
      },

      {
        path: "schedule_event",
        name: "edit-admin-schedule-event",
        component: EditAdminScheduleEvent,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "schedule_event/create_event",
        name: "create-arena-event",
        component: CreateArenaEvent,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "team_list",
        name: "edit-admin-teamlist",
        component: EditAdminTeamList,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "training_staff",
        name: "edit-admin-train-staff",
        component: EditAdminTrainStaff,
        props: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/admin/:userId/teams/create",
    name: "admin-team-create",
    component: CreateAdminTeam,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/admin/user/:userId",
    name: "admin-user-view",
    component: UserInformation,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/user/:userId/edit",
    name: "admin-user-edit",
    component: EditUserInformation,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/:userId/teams/:teamId",
    name: "admin-team-view",
    component: AdminTeamView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/:userId/teams/:teamId/edit",
    name: "admin-team-edit",
    component: EditAdminTeam,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
  },
  {
    path: "/auth/register",
    name: "registration",
    component: Registration,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
