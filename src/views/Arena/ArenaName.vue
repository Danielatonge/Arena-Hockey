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
            <v-avatar class="rounded-lg" contain tile size="180">
              <v-img
                contain
                :src="
                  arena.profilePicture != null
                    ? arena.profilePicture
                    : require('@/assets/preview_arena_1.jpg')
                "
              ></v-img>
            </v-avatar>
          </div>
          <div class="my-auto">
            <p class="text-h4 white--text">{{ arena.title }}</p>
            <p class="white--text">
              <v-icon color="white">mdi-map-marker-outline</v-icon>
              {{ arena.address }}
            </p>
          </div>
        </div>
      </v-container>
    </v-img>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs
            vertical
            class="pl-4 rounded-lg my-sidetabs"
            v-model="sideTab"
          >
            <v-tab
              v-for="(item, i) in sidebar_items"
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
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
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
  computed: {
    ...mapState("arena", ["arena"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => {
        if (x.link !== "null") {
          if (x.link) return x.link;
        }
      });
    },
  },
  created() {
    this.$store.dispatch("arena/getArena", this.arenaId);
    this.sidebar_items = [
      {
        text: "Информация",
        link: { name: "arena-information", params: { arenaId: this.arenaId } },
      },
      {
        text: "Платные услуги",
        link: { name: "payment-portal", params: { arenaId: this.arenaId } },
      },
      {
        text: "Расписание мероприятий",
        link: { name: "event-schedule", params: { arenaId: this.arenaId } },
      },
      {
        text: "Список команд",
        link: { name: "arena-team-list", params: { arenaId: this.arenaId } },
      },
      {
        text: "Тренерский состав",
        link: {
          name: "arena-training-staff",
          params: { arenaId: this.arenaId },
        },
      },
    ];

    const arenaItem = this.arena;
    this.contact_list = [
      { icon: "mdi-whatsapp", link: `${arenaItem.whatsApp}` },
      { icon: "mdi-instagram", link: `${arenaItem.instagram}` },
      { icon: "mdi-alpha-k-box", link: `${arenaItem.vk}` },
      { icon: "mdi-web", link: `${arenaItem.website}` },
      { icon: "mdi-music-note-outline", link: `${arenaItem.tiktok}` },
      { icon: "mdi-twitter", link: `${arenaItem.twitter}` },
      { icon: "mdi-youtube", link: `${arenaItem.youtube}` },
      { icon: "mdi-facebook", link: `${arenaItem.facebook}` },
    ];

    this.breadcrumb_items = [
      {
        text: "Ледовые дворцы и арены",
        disabled: false,
        href: "/arena",
      },
      {
        text: `${arenaItem.title}`,
        disabled: true,
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
      sideTab: 0,
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
