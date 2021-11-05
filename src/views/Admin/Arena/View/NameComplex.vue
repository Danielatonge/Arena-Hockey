<template>
  <div>
    <div class="white">
      <v-container class="pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="4">
            <v-avatar class="rounded-lg" height="280px" width="100%">
              <v-img :src="arena.profilePicture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <div class="mb-16">
              <div class="text-h5">{{ arena.title }}</div>
              <div>{{ arena.address }}</div>
            </div>
            <div>
              <router-link
                :to="{
                  name: 'edit-complex-information',
                  params: { arenaId: arena.id },
                }"
                class="reset-link"
              >
                <v-btn class="mr-2 mb-2" color="primary" elevation="0">
                  Редактировать
                </v-btn>
              </router-link>
              <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
                Добавить в избранное
              </v-btn>
            </div>
            <v-row align="center" class="pl-2">
              <v-checkbox v-model="checkbox"></v-checkbox>
              Уведомлять при появлении изменений
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="grey lighten-4">
      <v-container>
        <v-row class="mt-2">
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
                exact
                :to="item.link"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    arenaId: {
      type: String,
      required: true,
    },
  },
  computed: mapState("arena", ["arena"]),
  created() {
    const id = this.arenaId;
    this.sections = [
      {
        text: "Информация",
        link: `/admin/sport_complex/${id}`,
      },
      {
        text: "Платные услуги",
        link: `/admin/sport_complex/${id}/payment_portal`,
      },
      {
        text: "Расписание мероприятий",
        link: `/admin/sport_complex/${id}/schedule_event`,
      },
      {
        text: "Список команд",
        link: `/admin/sport_complex/${id}/team_list`,
      },
      {
        text: "Тренерский состав",
        link: `/admin/sport_complex/${id}/training_staff`,
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
  methods: {},
};
</script>

<style></style>
