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
              v-model="sort_model"
              value="По популярности"
              solo
              flat
              item-text="value"
              item-value="key"
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

    <v-dialog v-model="filter_dialog" max-width="600">
      <v-card class="grey lighten-5">
        <v-card-title class="py-3">
          <v-row>
            <v-col cols="11">
              <div class="text-h5 black--text">Фильтры</div>
            </v-col>
            <v-col>
              <div class="mb-4">
                <v-icon @click.stop="filter_dialog = false">mdi-close</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <div class="black--text font-weight-bold">Сортировка</div>
              <v-select
                :items="sort_by_alphabet"
                value="По алфавиту (от А до Я)"
                solo
                flat
                prepend-icon="mdi-swap"
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-3">
          <v-btn class="body-2" @click="filter_dialog = false" elevation="0">
            Назад
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="primary" class="body-2"> Добавить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          (x.title ? x.title.toLowerCase().includes(term) : false) ||
          (x.metro ? x.metro.toString().toLowerCase().includes(term) : false) ||
          (x.address ? x.address.toLowerCase().includes(term) : false) ||
          (x.courtSize ? x.courtSize == term : false)
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
    sort_model() {
      console.log(this.sort_model);
      if (this.sort_model == 0) {
        this.displayedArenas.sort((item1, item2) => {
          console.log(item1, item2);
          if (item1.title < item2.title) {
            return -1;
          }
          if (item1.title > item2.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.displayedArenas.sort(function (item1, item2) {
          if (item1.title < item2.title) {
            return 1;
          }
          if (item1.title > item2.title) {
            return -1;
          }
          return 0;
        });
      }
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
      sort_by_team: [
        { key: 0, value: "По именни (от Я до А)" },
        { key: 1, value: "По именни (от А до Я)" },
      ],
      sort_model: null,
      sort_by_alphabet: [
        { key: 0, value: "По алфавиту (от А до Я)" },
        { key: 1, value: "По алфавиту (от Я до А)" },
      ],
      display_item: { state: "Показывать по 5", value: 5 },
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
      filter_dialog: false,
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