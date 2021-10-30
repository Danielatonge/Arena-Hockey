<template>
  <v-container class="pb-10">
    <div class="pb-8">
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
          <div class="body-1 grey--text">
            Найдено: {{ arenas ? arenas.length : 0 }} результатов
          </div>
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
    <v-row dense class="mx-n4 mb-4">
      <v-col
        class="pa-4"
        cols="12"
        md="6"
        xl="4"
        v-for="arena in arenas"
        :key="arena.id"
      >
        <AdminArenaCard
          :arena="arena"
          @remove-selected="removeFromSelected(arena)"
          @add-selected="addToSelected(arena)"
        />
      </v-col>
    </v-row>
    <div class="mb-3" v-if="!arenas.length">
      По вашему запросу ничего не найдено.
    </div>

    <div>
      <v-btn class="rounded-lg mr-2" large depressed color="primary">
        <router-link to="/admin/sport_complex/create" class="reset-link d-flex">
          <v-icon class="mr-2">mdi-plus</v-icon>
          <div class="my-auto">Создать Арену</div>
        </router-link>
      </v-btn>
      <v-btn
        :disabled="!selected_arenas.length"
        class="rounded-lg ml-2"
        color="grey lighten-2"
        @click="deleteSelected"
        large
        depressed
      >
        <div class="my-auto">Удалить</div>
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
import AdminArenaCard from "@/components/Admin/AdminArenaCard.vue";

export default {
  name: "Home",
  computed: {
    ...mapState("user", {
      userId: "userId",
      arenas: (state) => state.arenas.map((item) => item.arena),
      selected_arenas: "selected_arenas",
    }),
  },
  components: { AdminArenaCard },
  created() {
    this.fetchArenaByUserId(this.userId);
  },
  methods: {
    removeFromSelected(arena) {
      this.$store.dispatch("user/removeFromSelectedArenas", arena);
    },
    addToSelected(arena) {
      this.$store.dispatch("user/addToSelectedArenas", arena);
    },
    fetchArenaByUserId(userId) {
      this.$store.dispatch("user/getArenas", userId);
    },
    deleteSelected() {
      this.$store.dispatch("user/deleteSelected");
    },
  },
  data() {
    return {
      selectedList: [],
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
      sort_by_team: ["По популярности", "По именни"],
      display_items: ["Показывать по 12", "Показывать по 25"],
    };
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>
