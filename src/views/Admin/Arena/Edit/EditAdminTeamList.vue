<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Список команд</div>
      <div class="mb-4">
        <v-btn
          large
          @click="add_team_dialog = true"
          class="mr-2 mb-2 primary"
          elevation="0"
        >
          Добавить команду
        </v-btn>

        <v-btn
          large
          class="mr-2 mb-2"
          color="grey lighten-2"
          elevation="0"
          @click="
            $router.push({ name: 'complex-information', params: { arenaId } })
          "
        >
          Вернуться к просмотру
        </v-btn>
      </div>
      <div class="pb-8">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="cities"
              v-model="filter_city"
              solo
              flat
              hide-details="auto"
              @change="fetchTeam"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="8">
            <v-text-field
              label="Поиск по названию команды"
              v-model="search"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
              @keyup.enter="fetchTeam"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="2">
            <v-select
              :items="type_teams"
              placeholder="Тип команды"
              v-model="filter_type"
              item-text="text"
              item-value="value"
              solo
              flat
              return-object
              hide-details="auto"
              @change="fetchTeam"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3">
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
              @change="fetchTeam"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ ateams.length }} результатов
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
              return-object
              solo
              flat
              hide-details="auto"
              @change="fetchTeam"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" v-for="(teamObj, i) in ateams" :key="i">
          <AdminTeamCard :arenaTeam="teamObj" @team-remove="removeTeam">
            <template #button>
              <v-col cols="12" md="4" lg="7">
                <v-btn
                  @click.stop="removeTeam(teamObj.team.id)"
                  class="primary"
                  elevation="0"
                >
                  Открепить команду
                </v-btn>
              </v-col>
            </template>
            <template #hide="{ checked, toggle }">
              <v-col>
                <v-checkbox
                  :value="checked"
                  @click.stop="toggle"
                  label="Скрыть команду"
                />
              </v-col>
            </template>
          </AdminTeamCard>
        </v-col>
      </v-row>
      <!-- <div class="text-center py-10" v-if="ateams.length">
        <v-pagination
          color="grey"
          v-model="page"
          :length="paginationLength"
          :total-visible="7"
        ></v-pagination>
      </div> -->
    </div>
    <div class="mb-4">
      <v-dialog v-model="add_team_dialog" max-width="600">
        <v-card :loading="adding_team" class="grey lighten-5">
          <v-card-title class="py-3">
            <v-row>
              <v-col cols="11">
                <div class="text-h5 black--text">Добавить команду</div>
              </v-col>
              <v-col>
                <div class="mb-4">
                  <v-icon @click.stop="add_team_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selected_team"
              :items="tpteams"
              :loading="is_searching"
              color="white"
              solo
              flat
              single-line
              hide-selected
              hide-no-data
              item-text="title"
              item-value="id"
              label="Поиск команды"
              placeholder="Поиск команды"
              prepend-inner-icon="mdi-magnify"
              return-object
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete>
            <v-checkbox v-model="hide_team" label="Скрыть команду" class="" />
          </v-card-text>
          <v-card-actions class="mt-3">
            <v-btn
              class="body-2"
              @click="add_team_dialog = false"
              elevation="0"
            >
              Назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="addTeam"
              :disabled="adding_team"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="confirm_dialog" max-width="600">
        <v-card class="py-3">
          <v-card-title class="">
            <v-row>
              <v-col cols="11">
                <div class="text-h5 black--text">
                  Вы действительно хотите удалить команду из состава спортивного
                  комплекса?
                </div>
              </v-col>
              <v-col>
                <div class="mb-4">
                  <v-icon @click.stop="confirm_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-actions class="mt-3">
            <v-btn class="body-2" @click="confirm_dialog = false" elevation="0">
              Отменить
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="deleteTeam"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdminTeamCard from "@/components/Admin/Team/AdminTeamCard";

export default {
  components: { AdminTeamCard },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("teamplayer", {
      tpteams: "teams",
    }),
    ...mapState("arena", {
      ateams: "teams",
    }),
  },
  watch: {
    page() {
      this.fetchTeam();
    },
  },
  mounted() {
    this.$store.dispatch("teamplayer/getTeams");
    this.fetchTeam();
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      current_team: -1,
      numFound: 0,
      paginationLength: 1,
      confirm_dialog: false,
      add_team_dialog: false,
      search: "",
      filter_type: { value: "ADULT", text: "Взрослая" },
      filter_city: "Москва",
      display_item: { state: "Показывать по 5", value: 5 },
      cities: ["Москва", "Казань"],
      sort_model: { key: 1, value: "По именни (от А до Я)" },
      sort_order: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      type_teams: [
        { value: "KID", text: "Детскaя" },
        { value: "ADULT", text: "Взрослая" },
        { value: "YOUTH", text: "Юношеская" },
        { value: "FEMALE", text: "Женская" },
      ],
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
      hide_team: false,
      selected_team: null,
      is_searching: false,
      adding_team: false,
      teamId: null,
    };
  },
  methods: {
    removeTeam(id) {
      this.confirm_dialog = true;
      this.teamId = id;
    },
    deleteTeam() {
      this.$store.dispatch("arena/deleteTeam", {
        arenaId: this.arenaId,
        teamId: this.teamId,
      });
      this.confirm_dialog = false;
    },

    addTeam() {
      this.adding_team = true;
      const data = {
        arenaId: this.arenaId,
        teamId: this.selected_team.id,
        visibility: this.hide_team ? 0 : 1,
      };
      this.$store
        .dispatch("arena/createArenaTeam", { data, team: this.selected_team })
        .then(() => {
          this.add_team_dialog = false;
          this.selected_team = null;
          this.hide_team = false;
          this.adding_team = false;
        });
    },
    fetchTeam() {
      const filters = {
        arenaId: this.arenaId,
        city: this.filter_city,
        type: this.filter_type.value,
        currentPage: this.page,
        pageSize: this.display_item.value,
        queryString: this.search,
        sortBy: this.sort_model.key,
      };
      this.$store.dispatch("arena/filterTeams", filters).then(() => {
        // this.paginationLength = paginationLength;
        // this.numFound = numFound;
      });
    },
  },
};
</script>

<style></style>
