<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="350px"
      width="100%"
      src="@/assets/banner-arena.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
          <div class="pr-3 my-auto">
            <a
              v-for="(item, index) in valid_contact_list"
              class="reset-link"
              :key="index"
              :href="item.link"
              target="_blank"
            >
              <v-btn
                elevation="0"
                x-small
                color="transparent"
                height="40px"
                class="mx-1"
              >
                <v-icon color="white"> {{ item.icon }}</v-icon>
              </v-btn>
            </a>
          </div>
        </v-row>

        <div class="d-flex mt-5 mb-2">
          <div class="pr-4">
            <v-img
              :src="require('@/assets' + '/vershina_logo.png')"
              height="180px"
              width="180px"
              class="rounded-xl"
              contain
            ></v-img>
          </div>
          <div class="my-auto">
            <p class="text-h4 white--text">{{ current_arena.title }}</p>
            <p class="white--text">
              <v-icon color="white">mdi-map-marker-outline</v-icon>
              {{ current_arena.address }}
            </p>
          </div>
        </div>
        <v-btn
          @click="
            $router.push({ path: `/arena/${current_arena.id}/event_schedule` })
          "
          color="primary mr-4 mt-4"
          elevation="0"
          >Забронировать</v-btn
        >
        <!-- <v-btn
          class="mt-4"
          @click="
            $router.push({ path: `/arena/${current_arena.id}/information#map` })
          "
          dark
          outlined
          elevation="0"
        >
          Как проехать?
        </v-btn> -->
      </v-container>
    </v-img>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs
            vertical
            class="pl-4 rounded-lg my-sidetabs"
            v-model="sidebar_tab"
          >
            <v-tab
              v-for="(item, i) in sidebar_items"
              :key="i"
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["current_arena"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => x.link !== "");
    },
  },
  created() {
    const arenaId = this.$route.params.id;
    this.$store.dispatch("getArenaGivenID", arenaId);
    this.$store.dispatch("getServicesAll");
    this.$store.dispatch("getArenaTeams", arenaId);
    this.$store.dispatch("getArenaTrainers");

    this.sidebar_items = [
      { text: "Информация", link: `/arena/${arenaId}/information` },
      {
        text: "Платные услуги",
        link: `/arena/${arenaId}/payment_portal`,
      },
      {
        text: "Расписание мероприятий",
        link: `/arena/${arenaId}/event_schedule`,
      },
      { text: "Список команд", link: `/arena/${arenaId}/list_teams` },
      {
        text: "Тренерский состав",
        link: `/arena/${arenaId}/training_staff`,
      },
      {
        text: "Состав руководства",
        link: `/arena/${arenaId}/leadership`,
      },
    ];

    const arenaItem = this.current_arena;
    this.contact_list = [
      { icon: "mdi-whatsapp", link: `${arenaItem.whatsApp}` },
      { icon: "mdi-instagram", link: `${arenaItem.instagram}` },
      { icon: "mdi-vk", link: `${arenaItem.vk}` },
      { icon: "mdi-web", link: `${arenaItem.website}` },
      { icon: "mdi-music-note-outline", link: `${arenaItem.tiktok}` },
      { icon: "mdi-twitter", link: `${arenaItem.twitter}` },
      { icon: "mdi-youtube", link: `${arenaItem.youtube}` },
      { icon: "mdi-facebook", link: `${arenaItem.facebook}` },
    ];

    this.breadcrumb_items = [
      {
        text: "Москва",
        disabled: false,
        href: "/",
      },
      {
        text: `${arenaItem.title}`,
        disabled: true,
        href: "/arena/id",
      },
    ];
  },
  methods: {
    openContactInTab(link) {
      let routeData = this.$router.resolve({ name: `/${link}` });
      window.open(routeData.href, "_blank");
    },
  },

  data() {
    return {
      name: "ArenaName",
      contact_list: null,
      sidebar_tab: 0,
      breadcrumb_items: null,
      selectedItem: 0,
      sidebar_items: null,
    };
  },
};
</script>

<style>
.border > .right-border {
  border-right: 1px solid #ccc;
}
.border:last-child .right-border {
  border-right: unset;
}
.wrapper-map {
  background-color: #ccc;
  height: 600px;
  width: 100%;
  position: relative;
  margin: 10px auto;
}
</style>