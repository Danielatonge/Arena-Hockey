<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs
            vertical
            class="pl-4 rounded-lg my-sidetabs"
            v-model="sidebar_tab"
          >
            <v-tab
              v-for="(item, i) in sections"
              :key="i"
              exact-path
              router
              :to="item.link"
              exact
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <router-view :arena="arena"></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("arena", ["arena"]),
  },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    const arenaId = this.arenaId;
    const userId = this.userId;
    this.sections = [
      {
        text: "Информация",
        link: { name: "edit-complex-information", params: { userId, arenaId } },
      },
      {
        text: "Платные услуги",
        link: {
          name: "edit-admin-payment-portal",
          params: { userId, arenaId },
        },
      },
      {
        text: "Расписание мероприятий",
        link: {
          name: "edit-admin-schedule-event",
          params: { userId, arenaId },
        },
      },
      {
        text: "Список команд",
        link: { name: "edit-admin-teamlist", params: { userId, arenaId } },
      },
      {
        text: "Тренерский состав",
        link: { name: "edit-admin-train-staff", params: { userId, arenaId } },
      },
    ];

    this.breadcrumb_items = [
      {
        text: "Личный кабинет",
        disabled: false,
        exact: true,
        to: { name: "user-profile", params: { userId } },
      },
      {
        text: "Мои спортивные комплексы",
        disabled: false,
        exact: true,
        to: { name: "admin-add-arena-sportcomplex", params: { userId } },
      },
      {
        text: this.arena.title,
        disabled: true,
        to: "",
      },
    ];
  },
  data() {
    return {
      checkbox: null,
      sidebar_tab: 0,
      breadcrumb_items: [],
      sections: [],
    };
  },
  methods: {
    // fetchArenaById(arenaId) {
    //   return axios
    //     .get(`/arena/${arenaId}`)
    //     .then((response) => {
    //       this.arena = response.data;
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>

<style></style>
