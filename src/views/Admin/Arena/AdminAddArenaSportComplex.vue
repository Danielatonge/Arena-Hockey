<template>
  <v-container class="pb-10">
    <div class="pb-8">
      <v-row dense>
        <v-col class="d-flex" cols="12" md="2">
          <v-select
            :items="cities"
            item-text="text"
            item-value="value"
            v-model="filter_city"
            solo
            flat
            hide-details="auto"
            @change="fetchArena"
          ></v-select>
        </v-col>
        <v-col cols="9" md="8" lg="8">
          <v-text-field
            label="Поиск"
            single-line
            prepend-inner-icon="mdi-magnify"
            solo
            flat
            hide-details="auto"
            class="rounded-lg"
            v-model="search"
            @keyup.enter="fetchArena"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-btn
            class="rounded-lg"
            large
            depressed
            height="48px"
            width="100%"
            color="primary"
            @click="fetchArena"
          >
            Найти
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
          <v-select
            :items="sort_order"
            v-model="sort_model"
            item-text="value"
            item-value="key"
            return-object
            solo
            flat
            prepend-icon="mdi-sort"
            hide-details="auto"
            @change="fetchArena"
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
            value="Показывать по 5"
            v-model="display_item"
            item-text="state"
            item-value="value"
            solo
            flat
            hide-details="auto"
            @change="fetchArena"
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
        >
          <v-btn
            x-small
            class="rounded-lg white"
            height="30px"
            elevation="0"
            @click.stop="deleteArena(arena.id)"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </AdminArenaCard>
      </v-col>
    </v-row>
    <div class="mb-3" v-if="!arenas.length">
      По вашему запросу ничего не найдено.
    </div>

    <div>
      <v-btn
        class="rounded-lg mr-2"
        large
        depressed
        color="primary"
        @click="
          $router.push({
            name: 'create-complex-information',
            params: { userId },
          })
        "
      >
        <!-- <v-icon class="mr-2">mdi-plus</v-icon> -->
        <div class="my-auto">Создать Арену</div>
      </v-btn>
    </div>
    <div class="text-center py-10">
      <v-pagination
        color="grey"
        v-model="page"
        :length="paginationLength"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AdminArenaCard from "@/components/Admin/AdminArenaCard.vue";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("user", {
      arenas: (state) => state.arenas.map((item) => item.arena),
    }),
  },
  components: { AdminArenaCard },
  created() {
    // this.fetchArenaByUserId(this.userId);
    this.fetchArena();
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
    fetchArena() {
      const filters = {
        userId: this.userId,
        city: this.filter_city,
        currentPage: this.page,
        pageSize: this.display_item.value,
        queryString: this.search,
        sortBy: this.sort_model.key,
      };
      this.$store
        .dispatch("arena/filterAdminArenas", filters)
        .then(({ paginationLength, numFound }) => {
          this.paginationLength = paginationLength;
          this.numFound = numFound;
        });
    },
    deleteSelected() {
      this.$store.dispatch("user/deleteSelected");
    },
    deleteArena(arenaId) {
      this.$store.dispatch("user/deleteArena", arenaId);
    },
  },
  data() {
    return {
      page: 1,
      perPage: 3,
      paginationLength: 10,
      filter_city: "Москва",
      search: "",
      display_item: { state: "Показывать по 5", value: 5 },
      cities: ["Москва", "Казань"],
      sort_model: { key: 1, value: "По именни (от А до Я)" },
      sort_order: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
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
