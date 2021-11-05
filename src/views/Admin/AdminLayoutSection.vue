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
              <v-img
                :src="
                  user.profilePicture
                    ? user.profilePicture
                    : require('@/assets/unknown.jpeg')
                "
              ></v-img>
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
            <router-view :user="user"></router-view>
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
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$store.dispatch("user/getUser", this.userId);
    const userId = this.userId;
    this.sidebar_items = [
      {
        text: "Профиль",
        link: { name: "user-profile", params: { userId } },
      },
      {
        text: "Центр сообщений",
        link: "",
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
        link: { name: "admin-team", params: { userId } },
      },
      {
        text: "Мои спортивные комплексы",
        link: { name: "admin-add-arena-sportcomplex", params: { userId } },
      },

      {
        text: "Моя организация",
        link: ``,
      },
      {
        text: "Мои мероприятия",
        link: ``,
      },
      { text: "Календарь мероприятий", link: `` },
    ];
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          exact: true,
          to: { name: "user-profile", params: { userId: this.user.id } },
        },
      ],
      sidebar_items: [],
      sidebar_tab: 0,
    };
  },
  methods: {
    validAge(age) {
      if (age) {
        return `${age} год`;
      }
    },
  },
};
</script>

<style scoped></style>
