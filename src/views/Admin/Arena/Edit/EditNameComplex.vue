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
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <router-view :arena="arena" v-if="arenaLoaded"></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    const arenaId = this.$route.params.id;
    this.fetchArenaById(arenaId).then((id) => {
      this.sections = [
        {
          text: "Информация",
          link: `/admin/sport_complex/${id}/edit`,
        },
        {
          text: "Платные услуги",
          link: `/admin/sport_complex/${id}/edit/payment_portal`,
        },
        {
          text: "Расписание мероприятий",
          link: `/admin/sport_complex/${id}/edit/schedule_event`,
        },
        {
          text: "Список команд",
          link: `/admin/sport_complex/${id}/edit/team_list`,
        },
        {
          text: "Тренерский состав",
          link: `/admin/sport_complex/${id}/edit/training_staff`,
        },
      ];
    });
  },
  data() {
    return {
      checkbox: null,
      sidebar_tab: 0,
      arena: {},
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название комплекса",
          disabled: true,
          href: "",
        },
      ],
      sections: [],
      arenaLoaded: false,
    };
  },
  methods: {
    fetchArenaById(arenaId) {
      return new Promise((resolve) => {
        axios
          .get(`/arena/${arenaId}`)
          .then((response) => {
            this.arena = response.data;
            this.arenaLoaded = true;
            resolve(response.data.id);
          })
          .catch((err) => console.log(err));
      });
    },
  },
};
</script>

<style></style>
