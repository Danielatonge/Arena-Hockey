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
            >
              <router-link to="/arena_maps" class="reset-link">
                На карте
              </router-link>
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
        <v-col
          class="pa-4"
          cols="12"
          md="4"
          xl="3"
          v-for="(arena, i) in list_arenas"
          :key="i"
        >
          <ArenaCard :arena="arena"  />
        </v-col>
        <v-col
          class="pa-4"
          cols="12"
          md="4"
          xl="3"
          v-for="i in 3"
          :key="i"
        >
          <ArenaCard :arena="i" />
        </v-col>
        
      </v-row>
    </v-container>
    <div class="text-center py-10">
      <v-pagination
        color="grey"
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArenaCard from "../../components/Arena/ArenaCard.vue";

export default {
  name: "Home",
  computed: {
    ...mapState(["list_arenas"]),
  },
  methods: {},
  data() {
    return {
      page: 1,
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
  components: { ArenaCard },
  mounted() {
    this.$store.dispatch("getAllArenas");
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>