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
    userId: {
      type: String,
      required: true,
    },
  },
  computed: mapState("arena", ["arena"]),
  created() {
    const arenaId = this.arenaId;
    const userId = this.userId;
    this.sections = [
      {
        text: "Информация",
        link: { name: "complex-information", params: { userId, arenaId } },
      },
      {
        text: "Платные услуги",
        link: { name: "admin-payment-portal", params: { userId, arenaId } },
      },
      {
        text: "Расписание мероприятий",
        link: { name: "admin-schedule-event", params: { userId, arenaId } },
      },
      {
        text: "Список команд",
        link: { name: "admin-team-list", params: { userId, arenaId } },
      },
      {
        text: "Тренерский состав",
        link: { name: "admin-train-staff", params: { userId, arenaId } },
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
  methods: {},
};
</script>

<style></style>
