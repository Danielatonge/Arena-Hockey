<template>
  <div>
    <div class="white">
      <v-container class="pb-0">
        <v-row class="">
          <AppBreadcrumb :items="breadcrumb_items" />
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
              <v-btn
                large
                class="mr-2 mb-2"
                color="grey lighten-2"
                elevation="0"
                @click="
                  $router.push({
                    name: 'admin-user-view',
                    params: { userId: user.id },
                  })
                "
              >
                перейти к пользователю
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
            <AppVerticalSidebar :items="sidebar_items" />
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
import { mapState } from "vuex";

export default {
  name: "AdminLayoutSection",
  created() {
    const userId = this.userId;
    this.fetchUser(userId);
  },
  computed: {
    ...mapState("user", ["userId", "user"]),
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
          link: `/admin/teams`,
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
      this.$store.dispatch("user/getUser", userId);
    },
  },
};
</script>

<style scoped></style>
