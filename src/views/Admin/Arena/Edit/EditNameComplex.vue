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
  },
  created() {
    const arenaId = this.arenaId;
    this.sections = [
      {
        text: "Информация",
        link: { name: "edit-complex-information", params: { arenaId } },
      },
      {
        text: "Платные услуги",
        link: { name: "edit-admin-payment-portal", params: { arenaId } },
      },
      {
        text: "Расписание мероприятий",
        link: { name: "edit-admin-schedule-event", params: { arenaId } },
      },
      {
        text: "Список команд",
        link: { name: "edit-admin-teamlist", params: { arenaId } },
      },
      {
        text: "Тренерский состав",
        link: { name: "edit-admin-train-staff", params: { arenaId } },
      },
    ];
  },
  data() {
    return {
      checkbox: null,
      sidebar_tab: 0,
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          to: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          to: "/admin/sport_complex",
        },
        {
          text: "Название комплекса",
          disabled: true,
          to: "",
        },
      ],
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
