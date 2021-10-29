<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <div class="pb-16">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="cities"
              v-model="sort_by_city"
              solo
              flat
              @change="fetchArena"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="12" md="10" lg="7" xl="8">
            <v-text-field
              label="Поиск по названию арены, метро, адресу"
              single-line
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              solo
              @change="fetchArena"
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <!--          <v-col cols="3" md="2" lg="2" xl="1">-->
          <!--            <v-btn-->
          <!--              class="rounded-lg"-->
          <!--              large-->
          <!--              depressed-->
          <!--              height="48px"-->
          <!--              width="100%"-->
          <!--              color="primary"-->
          <!--            >-->
          <!--              ФИЛЬТРЫ-->
          <!--            </v-btn>-->
          <!--          </v-col>-->
          <v-col cols="8" md="4" lg="3" xl="2">
            <v-btn
              class="rounded-lg grey lighten-2"
              large
              depressed
              height="48px"
              width="100%"
              @click="$router.push({ name: 'event-schedule-all' })"
            >
              Расписание мероприятий
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
              :items="sort_order"
              v-model="sort_model"
              solo
              flat
              @change="fetchArena"
              item-text="value"
              item-value="key"
              return-object
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ numFound }} результатов
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
              return-object
              hide-details="auto"
              @change="fetchDisplay"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4" :key="display_id">
        <v-col
          class="pa-4"
          cols="12"
          md="4"
          xl="3"
          v-for="(arena, i) in arenas"
          :key="i"
        >
          <ArenaCard :arena="arena" />
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center py-10" v-if="arenas.length">
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
          <v-btn elevation="0" color="primary" class="body-2"> Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArenaCard from "@/components/Arena/ArenaCard.vue";

export default {
  computed: mapState("arena", ["cities", "arenas"]),
  watch: {
    page() {
      this.fetchArena();
    },
  },
  methods: {
    fetchDisplay() {
      this.page = 1;
      this.fetchArena();
    },
    fetchArena() {
      const filters = {
        city: this.sort_by_city,
        currentPage: this.page,
        pageSize: this.display_item.value,
        queryString: this.search,
        sortBy: this.sort_model.key,
      };
      this.$store
        .dispatch("arena/getArenas", filters)
        .then(({ paginationLength, numFound }) => {
          this.paginationLength = paginationLength;
          this.numFound = numFound;
        });
    },
    goToMapAll() {
      this.$router.push({ name: "arena-map-all" });
    },
  },
  data() {
    return {
      page: 1,
      search: "",
      paginationLength: 10,
      numFound: 0,
      display_id: 0,
      sort_by_city: "Москва",
      sort_order: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      sort_model: { key: 1, value: "По именни (от А до Я)" },

      display_item: { state: "Показывать по 9", value: 9 },
      display_items: [
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 27", value: 27 },
        { state: "Показывать по 42", value: 42 },
        { state: "Показывать по 81", value: 81 },
      ],
      filter_dialog: false,
    };
  },
  components: { ArenaCard },
  created() {
    this.$store.dispatch("arena/getCities");
    this.fetchArena();
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>
