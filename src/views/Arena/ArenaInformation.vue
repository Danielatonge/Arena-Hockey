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
            <a v-for="(item, index) in contact_list" class="reset-link"
              :key="index"  :href="item.link" target="_blank">
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
              :src="require('@/assets' + '/team_room_1.jpg')"
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
          @click="
            $router.push({ path: `/arena/${current_arena.id}/information#map` })
          "
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
          <v-tabs vertical class="pl-4 rounded-lg my-sidetabs" v-model="sidebar_tab">
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

          <div>
            <p class="text-h4">{{ current_arena.fullTitle }}</p>
            <p class="text-h6">Информация</p>
            <div class="ml-n2 mb-3">
              <v-chip
                color="primary"
                class="ma-2"
                label
                v-for="(tag, i) in current_arena.tags"
                :key="i"
              >
                {{ tag }}
              </v-chip>
            </div>

            <div v-if="current_arena.description.length < 480">
              <p class="text-justify" v-html="current_arena.description"></p>
            </div>
            <div v-else>
              <p class="" v-if="!readMoreInfo">
                {{ current_arena.description.slice(0, 480) + "..." }}
              </p>
              <p class="" v-else v-html="current_arena.description"></p>
            </div>

            <p class="text-h6 mt-10">Адрес</p>
            <p class="blue--text">
              {{ current_arena.address }}
            </p>

            <p id="map" class="text-h6 mt-10">Как проехать?</p>
            <p class="grey--text text-justify">
              {{ current_arena.route }}
            </p>

            <p lass="mt-5">
              Ближайшие станции метро: <br />
              <span class="mr-3" v-for="(metro, i) in current_arena.metro" :key="i">
                {{ metro }}
              </span>
            </p>

            <section class="wrapper-map">
              <ArenaMap
                :coords="coords"
                :surfaces="surfaces"
                :zoom="zoom"
                @set-coords="coords = $event"
              />
            </section>

            <div class="mt-5">
              <v-btn
                color="primary"
                elevation="0"
                class="mr-3"
                @click="
                  $router.push({ path: `/arena/${current_arena.id}/event_schedule` })
                "
              >
                Забронировать
              </v-btn>
              <v-btn
                color="grey lighten-2"
                elevation="0"
                @click="
                  $router.push({ path: `/arena/${current_arena.id}/event_schedule` })
                "
              >
                Посмотреть катки
              </v-btn>
            </div>
            <p class="text-h5 font-weight-bold mt-10">Галерея</p>
            <v-row>
              <v-col cols="6" md="4" lg="3" v-for="(item, i) in media" :key="i">
                <v-img :src="item.src" @click="openGallery(i)"></v-img>
              </v-col>
              <LightBox
                ref="lightbox"
                :media="media"
                :show-caption="true"
                :show-light-box="false"
              />
            </v-row>

            <p class="text-h5 font-weight-bold mt-10">Контакты</p>
            <div>
              <p v-if="current_arena.phones">
                <span v-for="x in current_arena.phones" :key="x"> {{ x }} <br /></span>
            
              </p>
              <p>
                Администратор: Васильева Татьяна Михайловна <br />
                +7 495 964-39-69
              </p>
              <p>
                Email: {{ current_arena.mails ? current_arena.mails[0] : "" }} <br />
                Адрес: {{current_arena.address}}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArenaMap from "@/components/Arena/ArenaMap";
import { mapState, mapGetters } from "vuex";
import LightBox from "vue-image-lightbox";
import { media, sledgeHockey } from "@/data/dummy";

export default {
  components: {
    ArenaMap,
    LightBox,
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  computed: {
    ...mapState(["current_arena"]),
    ...mapState(["katokPL"]),
    ...mapGetters(["katok_services", "others_services"]),
  },
  mounted() {
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
        text: `${this.current_arena.title}`,
        disabled: true,
        href: "/arena/id",
      },
    ];
  },
  methods: {
    openContactInTab(link) {
      let routeData = this.$router.resolve({ name: `/${link}` })
      window.open(routeData.href, '_blank')
    },
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
  },
  data() {
    return {
      contact_list: null,
      sidebar_tab: 0,
      sidebar_items: null,
      premises_tab: null,
      premises_nav: ["Катки", "Другие"],
      sledgeHockey,
      readMoreInfo: null,
      selectedItem: 0,
      readMoreActivated: false,
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ], // We need organised data from the backend
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
      media,
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
div.my-sidetabs [role="tab"] {
  justify-content: flex-start;
}

.wrapper-map {
  background-color: #ccc;
  height: 600px;
  width: 100%;
  position: relative;
  margin: 10px auto;
}
</style>