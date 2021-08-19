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
              v-for="(item, index) in contact_list"
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
          <div>
            <p class="text-h4">Платные услуги</p>
            <v-tabs
              v-model="premises_tab"
              class="d-flex flex-no-wrap rounded-lg"
            >
              <v-tab v-for="item in premises_nav" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items
              v-model="premises_tab"
              style="background-color: unset"
            >
              <v-tab-item v-for="i in 2" :key="i">
                <v-row dense class="mt-5" v-show="premises_tab == 0">
                  <v-col
                    cols="12"
                    class="mb-4"
                    v-for="(item, i) in katok_services"
                    :key="i"
                  >
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <div class="ma-3">
                          
                          <v-avatar
                            class="rounded-lg"
                            tile
                            width="200px"
                            height="150px"
                            contain
                          >
                            <v-img
                              :src="
                                item.profilePicture != null
                                  ? item.profilePicture
                                  : `@/assets/preview_arena_1.jpg`
                              "
                            ></v-img>
                          </v-avatar>
                        </div>
                        <div class="description">
                          <v-card-text>
                            <div class="text-h5 mb-4">
                              {{ item.title }}
                              <span class="body-1 ml-4">
                                {{ item.length * item.width }}
                              </span>
                              <span class="body-1 ml-4"> {{ item.type }} </span>
                            </div>
                            <div class="body-1 grey--text mb-3">
                              {{ item.description }}
                            </div>
                            <div class="body-1 blue--text">
                              {{ item.phone }}
                            </div>
                          </v-card-text>
                          <v-card-actions class="pl-4 bottom">
                            <v-btn
                              class="px-6"
                              color="primary"
                              x-large
                              elevation="0"
                              @click="
                                $router.push({
                                  path: `/arena/${arenaId}/event_schedule`,
                                })
                              "
                            >
                              Забронировать
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row dense class="mt-5" v-show="premises_tab != 0">
                  <v-col
                    cols="12"
                    class="mb-2"
                    v-for="(item, i) in others_services"
                    :key="i"
                  >
                    <ArenaServiceCard
                      :data="item"
                      :arenaId="arenaId"
                    ></ArenaServiceCard>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
            <p class="text-h6 mt-10">Прайс-лист</p>
            <p class="grey--text">Цены указаны за 1 час аренды</p>

            <div v-for="(item, i) in katokPL" :key="i">
              <p class="text-h4 mt-8 mb-0">{{ item.title }}</p>
              <p class="grey--text">{{ item.miniDescription }}</p>
              <v-row>
                <v-col
                  cols="2"
                  class="text-center border"
                  v-for="(itm, indx) in item.price"
                  :key="indx"
                >
                  <div class="mb-3 grey--text">
                    {{ itm.price.startTime + " - " + itm.price.endTime }}
                  </div>
                  <div class="right-border mr-n3">
                    <p class="mb-0">{{ itm.price.weekdayPrice }}</p>
                    <p class="primary--text">{{ itm.price.holidayPrice }}</p>
                  </div>
                </v-col>
              </v-row>
              <div class="mt-n8" v-show="item.price.length">
                <span class="mr-5 font-weight-bold">
                  <v-icon style="font-size: 70px" color="#000" class="">
                    mdi-circle-small
                  </v-icon>
                  <span class="ml-n5">Будни</span>
                </span>
                <span class="font-weight-bold primary--text">
                  <v-icon style="font-size: 70px" color="primary" class="">
                    mdi-circle-small
                  </v-icon>
                  <span class="ml-n5"> Выходные </span>
                </span>
              </div>
            </div>

            <div class="mt-5">
              <v-btn
                color="primary"
                elevation="0"
                class="mr-3"
                @click="
                  $router.push({ path: `/arena/${arenaId}/event_schedule` })
                "
              >
                Забронировать
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ArenaServiceCard from "@/components/Arena/ArenaServiceCard";
export default {
  components: {
    ArenaServiceCard,
  },
  computed: {
    ...mapState(["katokPL", "current_arena"]),
    ...mapGetters(["katok_services", "others_services"]),
    
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + "...";
    },
  },
  created() {
    this.$store.dispatch("getServicesAll");
    this.$store.dispatch("getPriceListKatok");
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
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
  name: "PaymentPortal",
  data() {
    return {
      contact_list: null,
      sidebar_tab: 0,
      sidebar_items: null,
      premises_tab: null,
      premises_nav: ["аренда", "прочее"],
      elevation: 0,
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
      arenaId: "",
    };
  },
};
</script>

<style>
</style>