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
          <v-col cols="4" md="3" class="text-center">
            <v-avatar
              class="rounded-lg"
              contain
              tile
              height="250px"
              width="100%"
            >
              <v-img :src="user.profilePicture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="8" md="9">
            <div class="mb-16">
              <div class="text-h5">{{ user.name }}</div>
              <div class="text-h5">{{ user.middleName }}</div>
              <div class="text-h5">{{ user.surname }}</div>
              <div>{{ validAge(user.age) }}</div>
            </div>
            <div>
              <router-link :to="`/admin/${user.id}/edit`" class="reset-link">
                <v-btn large class="mr-2 mb-2" color="primary" elevation="0">
                  Редактировать
                </v-btn>
              </router-link>
              <v-btn
                large
                class="mr-2 mb-2"
                color="grey lighten-2"
                elevation="0"
              >
                Изменить пароль
              </v-btn>
              <v-btn
                large
                class="mr-2 mb-2"
                color="grey lighten-2"
                elevation="0"
              >
                Обратиться в тех.поддержку
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-tabs
              vertical
              class="pl-4 rounded-lg my-sidetabs"
              v-model="sidebar_tab"
            >
              <v-tab
                v-for="(item, i) in sidebar_items"
                :key="i"
                :to="item.link"
                exact
              >
                {{ item.text }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" md="9">
            <router-view :user="user" :loading="loading"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "AdminLayoutSection",
  created() {
    const userId = this.userId;
    this.fetchUser(userId);
  },
  computed: {
    ...mapState(["userId"]),
  },
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Название подраздела",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название раздела",
          disabled: true,
          href: "",
        },
      ],
      sidebar_items: [
        {
          text: "Профиль",
          link: `/admin`,
        },
        {
          text: "Центр сообщений",
          link: `/admin/sport_complex/add`,
        },
        {
          text: "Корзина",
          link: ``,
        },
        {
          text: "Избранное",
          link: ``,
        },
        {
          text: "Мои команды",
          link: ``,
        },
        { text: "Мои спортивные комплексы", link: `/admin/sport_complex` },

        {
          text: "Моя организация",
          link: ``,
        },
        {
          text: "Мои мероприятия",
          link: ``,
        },
        { text: "Календарь мероприятий", link: `` },
      ],
      sidebar_tab: 0,
      user: {},
      loading: false,
    };
  },
  methods: {
    validAge(age) {
      if (age) {
        return `${age} год`;
      }
    },
    fetchUser(userId) {
      axios.get(`/user/${userId}`).then((response) => {
        this.user = response.data;
        console.log(this.user);
      });
    },
  },
};
</script>

<style scoped></style>
