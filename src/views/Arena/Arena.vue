<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <div class="pb-16">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="team_tags"
              value="Москва"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="5" xl="7">
            <v-text-field
              label="Поиск по названию арены, метро, адресу"
              single-line
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="2" xl="1">
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
          </v-col>
          <v-col cols="8" md="4" lg="3" xl="2">
            <v-btn
              class="rounded-lg grey lighten-2"
              large
              depressed
              height="48px"
              width="100%"
            >
              <router-link to="/event_schedule_all" class="reset-link">
                Расписание мероприятий
              </router-link>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="text-h5">Ледовые дворцы и арены</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" md="2" lg="2" xl="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
              @click="goToMapAll"
            >
              На карте
            </v-btn>
          </v-col>

          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="По популярности"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ searchList.length }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              v-model="display_item"
              :items="display_items"
              item-text="state"
              item-value="value"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="4"
          xl="3"
          v-for="(arena, i) in displayedArenas"
          :key="i"
        >
          <ArenaCard :arena="arena" />
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center py-10">
      <v-pagination
        color="grey"
        v-model="page"
        :length="paginationLength"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArenaCard from "@/components/Arena/ArenaCard.vue";

export default {
  name: "Home",
  computed: {
    ...mapState(["list_arenas"]),
    displayedArenas() {
      return this.paginate(this.searchList);
    },
    searchList() {
      return this.list_arenas.filter((x) => {
        const term = this.search.toLowerCase();
        return (
          (x.title? x.title.toLowerCase().includes(term) : false) ||
          (x.metro? x.metro.toString().toLowerCase().includes(term): false) ||
          (x.address? x.address.toLowerCase().includes(term) : false) ||
          (x.courtSize? x.courtSize == term : false)
        );
      });
    },
  },
  watch: {
    display_item(val) {
      this.perPage = val;
      this.paginationLength = Math.ceil(this.searchList.length / this.perPage);
    },
    search() {
      this.paginationLength = Math.ceil(this.searchList.length / this.perPage);
    },
  },
  methods: {
    goToMapAll() {
      this.$store
        .dispatch("displayMapAll")
        .then(() => this.$router.push({ path: "/arena/arena_maps" }));
    },
    setPaginationLength() {
      this.paginationLength = Math.ceil(this.searchList.length / this.perPage);
    },
    paginate(items) {
      const cpage = this.page;
      const perPage = this.perPage;
      const from = cpage * perPage - perPage;
      const to = cpage * perPage;
      return items.slice(from, to);
    },
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      search: "",
      paginationLength: 10,
      team_tags: ["Москва", "Казань"],
      team_items: [
        "/arena_1",
        "/arena_2",
        "/arena_3",
        "/arena_4",
        "/arena_5",
        "/arena_6",
        "/arena_7",
        "/arena_2",
      ],
      sort_by_team: ["По популярности", "По именни"],
      display_item: { state: "Показывать по 5", value: 5 },
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
    };
  },
  components: { ArenaCard },
  mounted() {
    this.$store.dispatch("getAllArenas");
    this.setPaginationLength();
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>