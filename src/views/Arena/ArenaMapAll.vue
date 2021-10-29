<template>
  <div class="grey lighten-4">
    <v-container>
      <v-row dense class="my-4">
        <v-col cols="12" md="4" lg="3" xl="3">
          <v-row>
            <v-col cols="6" class="pr-0">
              <v-btn
                class="rounded-lg"
                large
                depressed
                height="48px"
                width="100%"
                color="primary"
                @click="$router.push({ name: 'arena' })"
              >
                Списком
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="cities"
                v-model="city"
                solo
                flat
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9" md="6" lg="6" xl="7">
          <v-text-field
            label="Поиск по названию арены, метро, адресу"
            single-line
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            solo
            flat
            hide-details="auto"
            class="rounded-lg"
            @change="fetchArena"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="3" md="2" lg="2" xl="1">
          <v-btn
            class="rounded-lg"
            large
            depressed
            height="48px"
            width="100%"
            color="primary"
          >
            ФИЛЬТРЫ
          </v-btn>
        </v-col> -->
        <v-col cols="8" md="2" lg="3" xl="2">
          <v-btn
            class="rounded-lg grey lighten-2"
            large
            depressed
            height="48px"
            width="100%"
            @click="$router.push({ name: 'event-schedule-all' })"
          >
            Расписание
            <span v-show="$vuetify.breakpoint.lgAndUp">мероприятий</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <section class="wrapper-map-main">
      <ArenaMap
        :coords="coords"
        :surfaces="mapPoints"
        :zoom="zoom"
        :key="key"
        @set-coords="coords = $event"
      />
    </section>
    <v-container>
      <div class="text-h6 mt-5 text-center">Найдено {{ numFound }} арен</div>
      <!--      <v-row dense class="mx-n4">-->
      <!--        <v-col-->
      <!--          class="pa-4"-->
      <!--          cols="12"-->
      <!--          md="4"-->
      <!--          xl="3"-->
      <!--          v-for="(item, i) in team_items"-->
      <!--          :key="i"-->
      <!--        >-->
      <!--          <ArenaCard :item="item" />-->
      <!--        </v-col>-->
      <!--      </v-row>-->
    </v-container>
  </div>
</template>

<script>
import ArenaMap from "@/components/Arena/ArenaMap";
// import ArenaCard from "@/components/Arena/ArenaCard";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    ArenaMap,
  },
  watch: {
    mapPoints() {
      this.key += 1;
    },
  },
  computed: {
    ...mapState("arena", ["arenas"]),
    ...mapGetters("arena", ["showArenasOnMap"]),
    mapPoints() {
      return this.showArenasOnMap;
    },
  },
  created() {
    const query = this.$route.query.arenaTitle;
    if (query) this.search = query;
    this.fetchArena();
  },
  methods: {
    fetchArena() {
      const filters = {
        city: this.city,
        currentPage: 1,
        pageSize: 20,
        queryString: this.search,
        sortBy: 1,
      };
      this.$store.dispatch("arena/getArenas", filters).then(({ numFound }) => {
        this.numFound = numFound;
      });
    },
  },
  data() {
    return {
      cities: ["Москва", "Казань"],
      city: "Москва",
      coords: [55.7539, 37.6208],
      key: 0,
      zoom: 10,
      search: "",
      options: {
        layout: "default#image",
        imageSize: [30, 40],
        contentOffset: [0, 0],
      },
      numFound: 0,
      selectedSurfaces: this.$selectedSurfaces,
    };
  },
};
</script>

<style>
.wrapper-map-main {
  background-color: #ccc;
  height: 60vh;
  width: 100%;
  position: relative;
}
</style>
