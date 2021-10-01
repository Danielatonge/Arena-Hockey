<template>
  <v-container class="pb-10">
    <v-row class="">
      <div>
        <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
      </div>
    </v-row>
    <v-row class="mt-n2 mb-2">
      <v-col>
        <span class="text-h5">Добавить арену</span>
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
        <v-col cols="9" md="8" lg="10" xl="10">
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
            :items="display_items"
            value="Показывать по 12"
            solo
            flat
            hide-details="auto"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <v-row dense class="mx-n4">
      <!-- <v-col
        class="pa-4"
        cols="12"
        md="4"
        xl="3"
        v-for="(arena, i) in displayedArenas"
        :key="i"
      >
        <AdminArenaCard :arena="arena" />
      </v-col> -->
    </v-row>
    <div class="mb-3">По вашему запросу ничего не найдено.</div>

    <div>
      <v-btn class="rounded-lg" large depressed color="primary">
        <router-link
          to="/admin/sport_complex/information/create"
          class="reset-link d-flex"
        >
          <v-icon class="mr-2">mdi-plus</v-icon>
          <div class="my-auto">Создать Арену</div>
        </router-link>
      </v-btn>
    </div>
  </v-container>
  <!-- <div class="text-center py-10">
    <v-pagination
      color="grey"
      v-model="page"
      :length="paginationLength"
      :total-visible="7"
    ></v-pagination>
  </div> -->
</template>

<script>
import { mapState } from "vuex";
// import AdminArenaCard from "@/components/Admin/AdminArenaCard.vue";

export default {
  name: "Home",
  computed: {
    ...mapState(["list_arenas"]),
    displayedArenas() {
      return this.paginate(this.list_arenas);
    },
  },
  methods: {
    goToMapAll() {
      this.$store
        .dispatch("displayMapAll")
        .then(() => this.$router.push({ path: "/arena_maps" }));
    },
    setPaginationLength() {
      this.paginationLength = Math.ceil(this.list_arenas.length / this.perPage);
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
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Добавить арену",
          disabled: true,
          href: "/",
        },
      ],
      page: 1,
      perPage: 3,
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
      display_items: ["Показывать по 12", "Показывать по 25"],
    };
  },
  components: {},
  mounted() {
    this.$store.dispatch("getAllArenas");
    this.setPaginationLength();
  },
  watch: {},
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>
