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
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
              v-for="(item, index) in contact_list"
              :key="index"
              @click="$router.push({ path: `${item.link}` })"
            >
              <v-icon color="white"> {{ item.icon }}</v-icon>
            </v-btn>
          </div>
        </v-row>

        <div class="d-flex mt-5 mb-2">
          <div class="pr-4">
            <v-img
              :src="
                require('@/assets' + '/team_room_1.jpg')
              "
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
        <v-btn color="primary mr-4 mt-4" elevation="0">Забронировать</v-btn>
        <v-btn
          class="mt-4"
          @click="$router.push({ path: `/arena/${current_arena.id}/information#map` })"
          dark
          outlined
          elevation="0"
        >
          Как проехать?
        </v-btn>
      </v-container>
    </v-img>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs vertical class="pl-4 rounded-lg" v-model="sidebar_tab">
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
  },
  created() {
    const arenaId = this.$route.params.id;
    console.log("ARENA-ID", arenaId);
    this.$store.dispatch("getArenaGivenID", arenaId);
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
    this.$store.dispatch("getServicesAll");
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

    // this.$store.dispatch("getAllTeams");
    // this.$store.dispatch("getAllTrainers");
    this.breadcrumb_items = [
      {
        text: "Москва",
        disabled: false,
        href: "/",
      },
      {
        text: `${this.current_arena.title}`,
        disabled: true,
        href: "/arena/id",
      },
    ];
  },
  data() {
    return {
      name: "ArenaLeadership",
      contact_list: null,
      arenaId: null,
      sidebar_tab: 0,
      premises_tab: null,
      premises_nav: ["Катки", "Бросковые зоны", "Спортивные залы"],
      breadcrumb_items: null,
      selectedItem: 0,
      gallery_items: [
        "/gallery_1",
        "/gallery_2",
        "/gallery_3",
        "/gallery_4",
        "/gallery_5",
        "/gallery_6",
        "/gallery_7",
        "/gallery_8",
      ],
      sidebar_items: null,
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
      zoom: 16,
      surfaces: [
        {
          id: "1",
          city: this.$store.state.current_arena.city,
          type: "Mediawall",
          address: this.$store.state.current_arena.address,
          coords:
            `${this.$store.state.current_arena.lat}, ` +
            `${this.$store.state.current_arena.lan}`,
        },
      ],
      coords: [
        this.$store.state.current_arena.lat,
        this.$store.state.current_arena.lan,
      ],
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