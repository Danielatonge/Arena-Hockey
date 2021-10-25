<template>
  <div class="grey lighten-4">
    <v-container class="pt-5 pb-0">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <v-row class="mt-n2 mb-2">
        <v-col>
          <span class="text-h5">Мои спортивные комплексы</span>
        </v-col>
      </v-row>
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
          <v-col cols="9" md="8" lg="7" xl="8">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="8" md="4" lg="3" xl="2">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
            >
              <router-link to="/admin/sport_complex/add" class="reset-link">
                Добавить АРЕНУ
              </router-link>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
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
            <div class="body-1 grey--text">Найдено: 160 результатов</div>
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
          <AdminArenaCard :arena="arena" />
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
import AdminArenaCard from "@/components/Admin/AdminArenaCard.vue";

export default {
  name: "Home",
  computed: {
    ...mapState("arena", ["arenas"]),
    displayedArenas() {
      return this.paginate(this.arenas);
    },
  },
  watch: {
    display_item(val) {
      this.perPage = val;
      this.paginationLength = Math.ceil(this.arenas.length / this.perPage);
    },
  },
  methods: {
    goToMapAll() {
      this.$store
        .dispatch("arena/showArenasOnMap")
        .then(() => this.$router.push({ name: "arena-map-all" }));
    },
    setPaginationLength() {
      this.paginationLength = Math.ceil(this.arenas.length / this.perPage);
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
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: true,
          href: "/admin/sport_complex",
        },
      ],
      page: 1,
      perPage: 5,
      paginationLength: 10,
      team_tags: ["Москва", "Казань"],

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
  components: { AdminArenaCard },
  mounted() {
    this.$store.dispatch("arena/getArenas");
    this.setPaginationLength(); //TODO: dynamic pagination
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>
